import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function NightWatchers({ data, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-8"
        style={{
          background: '#0d0d0d',
          border: '1px solid rgba(255,49,49,0.2)',
          boxShadow: '0 0 60px rgba(255,49,49,0.08)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-white tracking-[3px]">NIGHT WATCHERS</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="font-mono text-lg text-white/40 hover:text-sm-red transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div
            className="rounded-xl p-5 text-center"
            style={{ background: 'rgba(255,49,49,0.05)', border: '1px solid rgba(255,49,49,0.15)' }}
          >
            <div className="font-display text-4xl sm-red">{data.unique}</div>
            <div className="font-mono text-[10px] text-white/30 tracking-[3px] mt-1">UNIQUE VISITORS</div>
          </div>
          <div
            className="rounded-xl p-5 text-center"
            style={{ background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.12)' }}
          >
            <div className="font-display text-4xl sm-gold">{data.total}</div>
            <div className="font-mono text-[10px] text-white/30 tracking-[3px] mt-1">TOTAL VISITS</div>
          </div>
        </div>

        {data.daily.length > 0 && (
          <div
            className="mb-6 rounded-xl p-4"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="font-mono text-[10px] text-white/30 tracking-[3px] mb-3">VISITS OVER TIME</div>
            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer>
                <BarChart data={data.daily}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} />
                  <YAxis allowDecimals={false} tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ background: '#111', border: '1px solid rgba(255,49,49,0.3)' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="count" fill="#FF3131" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="font-mono text-[10px] text-white/30 tracking-[3px] mb-3">RECENT</div>
        <div className="space-y-1.5">
          {data.recent.length === 0 && (
            <div className="font-mono text-xs text-white/25">No visits recorded yet.</div>
          )}
          {data.recent.map((v, i) => (
            <div
              key={i}
              className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg px-3 py-2 font-mono text-[11px]"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <span className="text-white/50">{new Date(v.created_at).toLocaleString()}</span>
              <span style={{ color: 'rgba(255,49,49,0.7)' }}>{v.browser}</span>
              <span style={{ color: 'rgba(255,215,0,0.7)' }}>{v.os}</span>
              <span className="text-white/30 truncate max-w-[200px]">{v.referrer || 'direct'}</span>
              <span className="text-white/25 ml-auto">{v.page}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
