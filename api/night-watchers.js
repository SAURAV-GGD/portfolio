import crypto from 'node:crypto'
import { getVisits, storeConfigured } from './_lib/store.js'

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest()
  const hb = crypto.createHash('sha256').update(String(b)).digest()
  return crypto.timingSafeEqual(ha, hb)
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  const expected = process.env.NIGHT_WATCHERS_PASS
  const given = req.query?.pass

  if (req.method !== 'GET' || !expected || !given || !safeEqual(given, expected)) {
    res.status(404).send('404 - Not Found')
    return
  }

  if (!storeConfigured()) {
    res.status(200).json({ total: 0, unique: 0, recent: [], daily: [] })
    return
  }

  try {
    const visits = await getVisits(1000)
    const unique = new Set(visits.map((v) => v.ip)).size
    const recent = visits.slice(0, 50).map(({ ip, ...rest }) => rest)

    const counts = {}
    for (const v of visits) {
      const day = String(v.created_at).slice(0, 10)
      counts[day] = (counts[day] || 0) + 1
    }
    const daily = Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }))

    res.status(200).json({ total: visits.length, unique, recent, daily })
  } catch {
    res.status(500).json({ error: 'Internal error' })
  }
}
