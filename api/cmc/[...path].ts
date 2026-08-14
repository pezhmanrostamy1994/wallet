const coinMarketCapOrigin = 'https://pro-api.coinmarketcap.com'

const allowedEndpoints = new Set([
  '/v1/cryptocurrency/listings/latest',
  '/v3/cryptocurrency/listings/latest',
  '/v2/cryptocurrency/quotes/latest',
  '/v2/cryptocurrency/quotes/historical',
])

const internalEndpointAliases: Record<string, string> = {
  '/wallet-quotes': '/v2/cryptocurrency/quotes/latest',
}

type VercelRequestLike = {
  method?: string
  url?: string
  headers?: Record<string, string | string[] | undefined>
}

type VercelResponseLike = {
  statusCode: number
  setHeader: (name: string, value: string) => void
  end: (body?: string) => void
}

function json(response: VercelResponseLike, body: unknown, status: number, headers: Record<string, string> = {}) {
  response.statusCode = status
  response.setHeader('content-type', 'application/json; charset=utf-8')
  Object.entries(headers).forEach(([name, value]) => response.setHeader(name, value))
  response.end(JSON.stringify(body))
}

/**
 * Server-side CoinMarketCap proxy for the Vercel deployment.
 *
 * The browser only ever calls /api/cmc/..., so an optional f3b1c3741850428a97e5017885cf0834 stays
 * in Vercel's environment variables and is never included in the client
 * bundle. The supported V3 listings endpoint also falls back to CMC's keyless
 * public API when no key has been configured.
 */
export default async function handler(request: VercelRequestLike, response: VercelResponseLike) {
    if (request.method !== 'GET') {
      json(response, { status: { error_message: 'Method not allowed' } }, 405, { Allow: 'GET' })
      return
    }

    const runtime = globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }
    const apiKey = runtime.process?.env?.f3b1c3741850428a97e5017885cf0834
    const requestUrl = new URL(request.url ?? '/', `https://${request.headers?.host ?? 'localhost'}`)
    const requestedPath = requestUrl.pathname.replace(/^\/api\/cmc/, '')
    const upstreamPath = internalEndpointAliases[requestedPath] ?? requestedPath

    // Keep this a narrowly-scoped proxy instead of exposing the CMC key through
    // an arbitrary upstream URL.
    if (!allowedEndpoints.has(upstreamPath)) {
      json(response, { status: { error_message: 'CoinMarketCap endpoint not found' } }, 404)
      return
    }

    try {
      const canUseKeylessPublicApi = upstreamPath === '/v3/cryptocurrency/listings/latest'
      if (!apiKey && !canUseKeylessPublicApi) {
        json(response, { status: { error_message: 'CoinMarketCap proxy is not configured' } }, 500)
        return
      }

      const upstreamOrigin = apiKey ? coinMarketCapOrigin : `${coinMarketCapOrigin}/public-api`
      const headers: Record<string, string> = {
          Accept: 'application/json',
          'User-Agent': 'orbit-wallet-cmc-proxy/1.0',
      }
      if (apiKey) headers['X-CMC_PRO_API_KEY'] = apiKey

      const upstream = await fetch(`${upstreamOrigin}${upstreamPath}${requestUrl.search}`, {
        headers,
        signal: AbortSignal.timeout(10_000),
      })
      const body = await upstream.text()

      response.statusCode = upstream.status
      response.setHeader('content-type', upstream.headers.get('content-type') ?? 'application/json; charset=utf-8')
      response.setHeader('cache-control', 'no-store, max-age=0')
      response.setHeader('x-cmc-proxy', 'vercel')
      response.end(body)
    } catch (error) {
      console.error('CoinMarketCap proxy request failed', error)
      json(response, { status: { error_message: 'CoinMarketCap proxy request failed' } }, 502)
    }
}
