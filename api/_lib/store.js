const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY

function baseHeaders() {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  }
}

export function storeConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY)
}

export async function insertVisit(record) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/visits`, {
    method: 'POST',
    headers: { ...baseHeaders(), Prefer: 'return=minimal' },
    body: JSON.stringify(record),
  })
  if (!res.ok) throw new Error(`store insert failed: ${res.status}`)
}

export async function getVisits(limit = 1000) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/visits?select=ip,browser,os,referrer,page,created_at&order=created_at.desc&limit=${limit}`,
    { headers: baseHeaders() },
  )
  if (!res.ok) throw new Error(`store read failed: ${res.status}`)
  return res.json()
}
