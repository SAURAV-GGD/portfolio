import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const ROOT = path.dirname(fileURLToPath(import.meta.url))

/**
 * Runs the Vercel-style serverless functions in /api during `vite dev`.
 *
 * Plain Vite doesn't execute these — it serves the source file as a JS module
 * (HTTP 200, content-type text/javascript), so the client's `res.json()` throws
 * and the Night Watchers panel silently fails to open. This middleware loads the
 * handler via SSR and shims a Vercel-like req/res so `/api/*` behaves like prod.
 */
function devApi() {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        if (!url.startsWith('/api/') || url.startsWith('/api/_lib')) return next()

        const { pathname, searchParams } = new URL(url, 'http://localhost')
        const file = path.join(ROOT, pathname + '.js')
        if (!existsSync(file)) return next()

        try {
          const mod = await server.ssrLoadModule(pathname + '.js')
          const handler = mod.default
          if (typeof handler !== 'function') return next()

          // ── Vercel-style request extras ──
          req.query = Object.fromEntries(searchParams.entries())
          if (req.method === 'POST' || req.method === 'PUT') {
            req.body = await readJsonBody(req)
          }

          // ── Vercel-style response helpers on top of Node's ServerResponse ──
          res.status = (code) => { res.statusCode = code; return res }
          res.json = (obj) => {
            if (!res.getHeader('Content-Type')) res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(obj))
            return res
          }
          res.send = (data) => { res.end(data); return res }

          await handler(req, res)
        } catch (err) {
          server.config.logger.error(`[dev-api] ${pathname} failed: ${err.stack || err}`)
          if (!res.headersSent) res.statusCode = 500
          res.end('Internal error')
        }
      })
    },
  }
}

function readJsonBody(req) {
  return new Promise((resolve) => {
    let raw = ''
    req.on('data', (c) => { raw += c })
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}) }
      catch { resolve({}) }
    })
    req.on('error', () => resolve({}))
  })
}

export default defineConfig(({ mode }) => {
  // Load .env into process.env so the /api handlers (server-side only) can read
  // NIGHT_WATCHERS_PASS / SUPABASE_* during local dev. '' = load all keys, not
  // just VITE_-prefixed ones. These are never exposed to the client bundle.
  Object.assign(process.env, loadEnv(mode, ROOT, ''))

  return {
    plugins: [react(), devApi()],
  }
})
