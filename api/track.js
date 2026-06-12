import { insertVisit, storeConfigured } from './_lib/store.js'
import { parseUA } from './_lib/ua.js'

const WINDOW_MS = 60_000
const MAX_REQ = 10
const hits = new Map()

function rateLimited(ip) {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    if (hits.size > 5000) hits.clear()
    return false
  }
  entry.count += 1
  return entry.count > MAX_REQ
}

function clean(value, max = 300) {
  return String(value ?? '').replace(/[<>]/g, '').slice(0, max)
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('Access-Control-Allow-Origin', process.env.SITE_ORIGIN || 'https://saurav-ggd-portfolio.vercel.app')
  res.setHeader('Access-Control-Allow-Methods', 'POST')

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const fwd = String(req.headers['x-forwarded-for'] || '')
  const ip = clean(fwd.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown', 64)

  if (rateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests' })
    return
  }

  if (!storeConfigured()) {
    res.status(204).end()
    return
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {}
  const ua = clean(req.headers['user-agent'], 400)
  const { browser, os } = parseUA(ua)

  try {
    await insertVisit({
      ip,
      ua,
      browser,
      os,
      referrer: clean(body.ref || req.headers.referer || ''),
      page: clean(body.page || '/', 200),
    })
  } catch {
    // tracking must never break the page
  }

  res.status(204).end()
}
