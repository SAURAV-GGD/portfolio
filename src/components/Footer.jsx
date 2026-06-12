import { useState, lazy, Suspense } from 'react'

const Panel = lazy(() => import('./NightWatchers.jsx'))

export default function Footer() {
  const [data, setData] = useState(null)

  const open = async () => {
    const pass = window.prompt('')
    if (!pass) return
    try {
      const res = await fetch(`/api/night-watchers?pass=${encodeURIComponent(pass)}`)
      if (!res.ok) return
      setData(await res.json())
    } catch {
      /* noop */
    }
  }

  return (
    <footer className="relative py-8 px-6 border-t border-sm-red/8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-white/20 tracking-[2px]">
          <span className="sm-red">SAURAV_KUMAR</span> · BUILT WITH REACT + VIBE · JAIPUR 🇮🇳
        </div>
        <div className="font-mono text-xs text-white/12 tracking-[2px]">
          © 2025 · ALL RIGHTS RESERVED
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-4 text-center">
        <button
          type="button"
          onClick={open}
          tabIndex={-1}
          className="font-mono text-[8px] tracking-[3px] text-white/5 hover:text-white/20 transition-colors duration-300"
        >
          NIGHT WATCHERS
        </button>
      </div>
      {data && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80">
              <div className="w-8 h-8 border-2 border-sm-red border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Panel data={data} onClose={() => setData(null)} />
        </Suspense>
      )}
    </footer>
  )
}
