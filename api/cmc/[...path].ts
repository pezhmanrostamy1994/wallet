const coinMarketCapOrigin = 'https://pro-api.coinmarketcap.com'

const allowedEndpoints = new Set([
  '/v1/cryptocurrency/listings/latest',
  '/v3/cryptocurrency/listings/latest',
  '/v2/cryptocurrency/quotes/latest',
  '/v2/cryptocurrency/quotes/historical',
])

function json(body: unknown, status: number, headers: HeadersInit = {}) {
  const responseHeaders = new Headers(headers)
  responseHeaders.set('content-type', 'application/json; charset=utf-8')

  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders,
  })
}

/**
 * Server-side CoinMarketCap proxy for the Vercel deployment.
 *
 * The browser only ever calls /api/cmc/..., so an optional CMC_API_KEY stays
 * in Vercel's environment variables and is never included in the client
 * bundle. The supported V3 listings endpoint also falls back to CMC's keyless
 * public API when no key has been configured.
 */
export default {
  async fetch(request: Request) {
    if (request.method !== 'GET') {
      return json({ status: { error_message: 'Method not allowed' } }, 405, { Allow: 'GET' })
    }

    const runtime = globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }
    const apiKey = runtime.process?.env?.CMC_API_KEY
    const requestUrl = new URL(request.url)
    const upstreamPath = requestUrl.pathname.replace(/^\/api\/cmc/, '')

    // Keep this a narrowly-scoped proxy instead of exposing the CMC key through
    // an arbitrary upstream URL.
    if (!allowedEndpoints.has(upstreamPath)) {
      return json({ status: { error_message: 'CoinMarketCap endpoint not found' } }, 404)
    }

    try {
      const canUseKeylessPublicApi = upstreamPath === '/v3/cryptocurrency/listings/latest'
      if (!apiKey && !canUseKeylessPublicApi) {
        return json({ status: { error_message: 'CoinMarketCap proxy is not configured' } }, 500)
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

      const listingCache = upstreamPath.endsWith('/cryptocurrency/listings/latest')

      return new Response(upstream.body, {
        status: upstream.status,
        headers: {
          'content-type': upstream.headers.get('content-type') ?? 'application/json; charset=utf-8',
          // CMC refreshes listings every minute; cache the expensive 500-asset
          // response for that interval and serve it stale briefly while Vercel
          // refreshes in the background.
          'cache-control': listingCache ? 'public, s-maxage=60, stale-while-revalidate=120' : 'public, s-maxage=20, stale-while-revalidate=40',
        },
      })
    } catch (error) {
      console.error('CoinMarketCap proxy request failed', error)
      return json({ status: { error_message: 'CoinMarketCap proxy request failed' } }, 502)
    }
  },
}
