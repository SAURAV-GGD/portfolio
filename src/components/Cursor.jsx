import { useEffect, useRef } from 'react'

const COLORS = ['#c8ff57', '#ff2d78', '#00d4ff', '#bf7aff', '#ffe033']

export default function Cursor() {
  const canvasRef  = useRef(null)
  const dotRef     = useRef(null)
  const ringRef    = useRef(null)
  const particles  = useRef([])
  const mouse      = useRef({ x: -200, y: -200 })
  const ring       = useRef({ x: -200, y: -200 })
  const rafId      = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const dot    = dotRef.current
    const ringEl = ringRef.current

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      mouse.current = { x, y }

      // snap dot
      dot.style.transform = `translate(${x - 5}px, ${y - 5}px)`

      // spawn pixel particles
      const count = 4
      for (let i = 0; i < count; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]
        particles.current.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          size: Math.random() * 5 + 2,
          color,
          alpha: 0.9,
          decay: Math.random() * 0.035 + 0.018,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8 - 0.4,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // lerp ring
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      ringEl.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`

      // draw & age particles
      particles.current = particles.current.filter(p => p.alpha > 0.01)
      for (const p of particles.current) {
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay
        p.vy += 0.04 // slight gravity

        // snap to 4px grid for pixel feel
        const px = Math.round(p.x / 4) * 4
        const py = Math.round(p.y / 4) * 4

        ctx.save()
        ctx.globalAlpha = Math.max(p.alpha, 0)
        ctx.shadowBlur  = 14
        ctx.shadowColor = p.color
        ctx.fillStyle   = p.color
        ctx.fillRect(px, py, p.size, p.size)
        ctx.restore()
      }

      rafId.current = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', onMove)
    draw()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      {/* pixel trail canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed', inset: 0,
          pointerEvents: 'none', zIndex: 9997,
        }}
      />

      {/* solid dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 10, height: 10,
          background: '#c8ff57',
          borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9999,
          boxShadow: '0 0 10px #c8ff57, 0 0 24px #c8ff5760',
          transition: 'transform 0.05s linear',
        }}
      />

      {/* trailing ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 40, height: 40,
          border: '1.5px solid rgba(200,255,87,0.55)',
          borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9998,
          boxShadow: '0 0 10px rgba(200,255,87,0.25)',
          transition: 'transform 0.14s ease',
        }}
      />
    </>
  )
}
