const coinMarketCapOrigin = 'https://pro-api.coinmarketcap.com'

const allowedEndpoints = new Set([
  '/v1/cryptocurrency/listings/latest',
  '/v3/cryptocurrency/listings/latest',
  '/v2/cryptocurrency/quotes/latest',
  '/v2/cryptocurrency/quotes/historical',
])

const internalEndpointAliases: Record<string, string> = {
  '/wallet-quotes': '/v2/cryptocurrency/quotes/latest',
  '/wallet-history': '/v2/cryptocurrency/quotes/historical',
}

type PublicListing = {
  symbol?: string
  quote?: { USD?: Record<string, unknown> }
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
 * The browser only ever calls /api/cmc/..., so an optional CMC_API_KEY stays
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
    const apiKey = runtime.process?.env?.CMC_API_KEY
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
      const canUseKeylessPublicApi = upstreamPath === '/v1/cryptocurrency/listings/latest'
        || upstreamPath === '/v3/cryptocurrency/listings/latest'
        || requestedPath === '/wallet-quotes'
      const isHistoricalQuotes = upstreamPath === '/v2/cryptocurrency/quotes/historical'
      if (!apiKey && isHistoricalQuotes) {
        // CMC does not expose historical quotes through its keyless public
        // endpoint. Return a valid JSON response so the client can use its
        // local fallback chart instead of surfacing a proxy error.
        json(response, {
          data: {},
          status: { error_message: 'Historical quotes require CMC_API_KEY; fallback chart is active.' },
        }, 200, { 'cache-control': 'no-store, max-age=0', 'x-cmc-proxy': 'vercel' })
        return
      }
      if (!apiKey && !canUseKeylessPublicApi) {
        json(response, { status: { error_message: 'CoinMarketCap proxy is not configured' } }, 500)
        return
      }

      const usePublicListingsFallback = !apiKey && (upstreamPath === '/v1/cryptocurrency/listings/latest' || upstreamPath === '/v3/cryptocurrency/listings/latest' || requestedPath === '/wallet-quotes')
      const requestPath = usePublicListingsFallback ? '/v3/cryptocurrency/listings/latest' : upstreamPath
      const requestSearch = requestedPath === '/wallet-quotes' && !apiKey
        ? '?start=1&limit=500&convert=USD'
        : requestUrl.search
      const upstreamOrigin = apiKey ? coinMarketCapOrigin : `${coinMarketCapOrigin}/public-api`
      const headers: Record<string, string> = {
          Accept: 'application/json',
          'User-Agent': 'orbit-wallet-cmc-proxy/1.0',
      }
      if (apiKey) headers['X-CMC_PRO_API_KEY'] = apiKey

      const upstream = await fetch(`${upstreamOrigin}${requestPath}${requestSearch}`, {
        headers,
        signal: AbortSignal.timeout(10_000),
      })
      const body = await upstream.text()

      let responseBody = body
      if (requestedPath === '/wallet-quotes' && !apiKey && upstream.ok) {
        const listings = JSON.parse(body) as { data?: PublicListing[] }
        const requestedSymbols = new Set((requestUrl.searchParams.get('symbol') ?? '').split(',').map((symbol) => symbol.trim().toUpperCase()).filter(Boolean))
        const quotes = Object.fromEntries((listings.data ?? [])
          .filter((listing) => Boolean(listing.symbol) && (!requestedSymbols.size || requestedSymbols.has(listing.symbol!.toUpperCase())))
          .map((listing) => [listing.symbol!.toUpperCase(), { symbol: listing.symbol, quote: { USD: listing.quote?.USD ?? {} } }]))
        responseBody = JSON.stringify({ data: quotes })
      }

      response.statusCode = upstream.status
      response.setHeader('content-type', upstream.headers.get('content-type') ?? 'application/json; charset=utf-8')
      response.setHeader('cache-control', 'no-store, max-age=0')
      response.setHeader('x-cmc-proxy', 'vercel')
      response.end(responseBody)
    } catch (error) {
      console.error('CoinMarketCap proxy request failed', error)
      json(response, { status: { error_message: 'CoinMarketCap proxy request failed' } }, 502)
    }
}
