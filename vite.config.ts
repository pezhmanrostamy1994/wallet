import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const serverFetch = (globalThis as unknown as { fetch?: (input: string, init?: { headers?: Record<string, string> }) => Promise<any> }).fetch?.bind(globalThis)
  const cmcHost = 'pro-api.coinmarketcap.com'
  const cmcIp = env.CMC_API_IP

  const requestViaIp = async (path: string) => {
    if (!cmcIp) throw new Error('CMC_API_IP is not configured')
    // @ts-expect-error Node runtime module; the Vite config tsconfig does not include node typings.
    const https = await import('node:https')
    return new Promise<{ status: number; contentType: string; body: string }>((resolve, reject) => {
      const request = https.request({
        hostname: cmcIp,
        port: 443,
        path,
        method: 'GET',
        servername: cmcHost,
        rejectUnauthorized: false,
        headers: {
          Accept: 'application/json',
          Host: cmcHost,
          'User-Agent': 'orbit-wallet-cmc-proxy/1.0',
          'X-CMC_PRO_API_KEY': env.CMC_API_KEY,
        },
      }, (upstream: any) => {
        let body = ''
        upstream.setEncoding('utf8')
        upstream.on('data', (chunk: string) => { body += chunk })
        upstream.on('end', () => resolve({
          status: upstream.statusCode ?? 502,
          contentType: upstream.headers?.['content-type'] ?? 'application/json',
          body,
        }))
      })
      request.setTimeout(20_000, () => request.destroy(new Error('CoinMarketCap IP request timed out')))
      request.on('error', reject)
      request.end()
    })
  }

  const requestViaFetch = async (path: string) => {
    if (!serverFetch) throw new Error('Node fetch is not available')
    const upstream = await serverFetch(`https://${cmcHost}${path}`, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'orbit-wallet-cmc-proxy/1.0',
        'X-CMC_PRO_API_KEY': env.CMC_API_KEY,
      },
    })
    return {
      status: upstream.status as number,
      contentType: (upstream.headers.get('content-type') ?? 'application/json') as string,
      body: await upstream.text() as string,
    }
  }

  const coinMarketCapHandler = async (request: any, response: any, next: () => void) => {
    if (!request.url) return next()
    if (!env.CMC_API_KEY || !serverFetch) {
      response.statusCode = 500
      response.end(JSON.stringify({ status: { error_message: 'CMC_API_KEY is not configured' } }))
      return
    }

    try {
      let upstream
      if (cmcIp) {
        try {
          upstream = await requestViaIp(request.url)
        } catch {
          upstream = await requestViaFetch(request.url)
        }
      } else {
        upstream = await requestViaFetch(request.url)
      }
      response.statusCode = upstream.status
      response.setHeader('content-type', upstream.contentType)
      response.end(upstream.body)
    } catch (error) {
      if (cmcIp) {
        try {
          const upstream = await requestViaIp(request.url)
          response.statusCode = upstream.status
          response.setHeader('content-type', upstream.contentType)
          response.end(upstream.body)
          return
        } catch { /* Fall through to the proxy error response. */ }
      }
      response.statusCode = 502
      response.end(JSON.stringify({ status: { error_message: 'CoinMarketCap proxy request failed', detail: error instanceof Error ? error.message : String(error) } }))
    }
  }

  return {
    plugins: [react(), {
      name: 'coinmarketcap-server-middleware',
      configureServer(server: any) {
        server.middlewares.use('/api/cmc', coinMarketCapHandler)
      },
      configurePreviewServer(server: any) {
        server.middlewares.use('/api/cmc', coinMarketCapHandler)
      },
    }],
  }
})
