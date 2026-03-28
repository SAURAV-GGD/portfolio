import { useEffect, useRef } from 'react'

const COLORS = ['#FF3131', '#FFD700', '#FF6B35', '#9B59B6', '#F0F0F0']

export default function Cursor() {
  const canvasRef = useRef(null)
  const dotRef    = useRef(null)
  const ringRef   = useRef(null)
  const mouse     = useRef({ x: -100, y: -100 })
  const pos       = useRef({ x: -100, y: -100 })
  const ring      = useRef({ x: -100, y: -100 })
  const particles = useRef([])
  const rafId     = useRef(null)
  const velocity  = useRef({ x: 0, y: 0 })
  const prevMouse = useRef({ x: -100, y: -100 })
  const isTouch   = useRef(false)

  useEffect(() => {
    // Detect touch device — hide custom cursor
    const checkTouch = () => { isTouch.current = true }
    window.addEventListener('touchstart', checkTouch, { once: true, passive: true })

    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const dot    = dotRef.current
    const ringEl = ringRef.current

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    let frameCount = 0

    const onMove = (e) => {
      if (isTouch.current) return
      const x = e.clientX
      const y = e.clientY

      // Compute velocity for trail intensity
      velocity.current.x = x - prevMouse.current.x
      velocity.current.y = y - prevMouse.current.y
      prevMouse.current = { x, y }

      mouse.current = { x, y }

      // Spawn particles based on speed
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2)
      const count = Math.min(Math.floor(speed * 0.15) + 1, 3)

      for (let i = 0; i < count; i++) {
        if (particles.current.length > 50) break  // hard cap for perf
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]
        const angle = Math.random() * Math.PI * 2
        const spread = Math.random() * 8
        particles.current.push({
          x: x + Math.cos(angle) * spread,
          y: y + Math.sin(angle) * spread,
          size: Math.random() * 3 + 1.5,
          color,
          alpha: 0.7 + Math.random() * 0.3,
          decay: Math.random() * 0.025 + 0.015,
          vx: velocity.current.x * 0.08 + (Math.random() - 0.5) * 0.8,
          vy: velocity.current.y * 0.08 + (Math.random() - 0.5) * 0.8,
          life: 1,
        })
      }
    }

    const draw = () => {
      if (isTouch.current) {
        dot.style.display = 'none'
        ringEl.style.display = 'none'
        rafId.current = requestAnimationFrame(draw)
        return
      }

      frameCount++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Ultra-smooth dot follow (lerp 0.35 — very snappy)
      pos.current.x += (mouse.current.x - pos.current.x) * 0.35
      pos.current.y += (mouse.current.y - pos.current.y) * 0.35
      dot.style.transform = `translate3d(${pos.current.x - 5}px, ${pos.current.y - 5}px, 0)`

      // Ring follows with slightly more lag (lerp 0.18 — smooth trail)
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18
      ringEl.style.transform = `translate3d(${ring.current.x - 22}px, ${ring.current.y - 22}px, 0)`

      // Draw particles (circles, not squares)
      particles.current = particles.current.filter(p => p.alpha > 0.01)
      for (const p of particles.current) {
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay
        p.vx *= 0.97
        p.vy *= 0.97
        p.size *= 0.995

        ctx.save()
        ctx.globalAlpha = Math.max(p.alpha, 0)
        ctx.shadowBlur = 12
        ctx.shadowColor = p.color
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      rafId.current = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    draw()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      window.removeEventListener('touchstart', checkTouch)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      {/* particle trail canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed', inset: 0,
          pointerEvents: 'none', zIndex: 9997,
        }}
      />

      {/* solid dot — instant follow */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 10, height: 10,
          background: '#FF3131',
          borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9999,
          boxShadow: '0 0 12px #FF3131, 0 0 30px #FF313160',
          willChange: 'transform',
        }}
      />

      {/* trailing ring — liquid smooth */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 44, height: 44,
          border: '1.5px solid rgba(255, 49, 49, 0.4)',
          borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9998,
          boxShadow: '0 0 15px rgba(255, 49, 49, 0.15), inset 0 0 15px rgba(255, 49, 49, 0.05)',
          willChange: 'transform',
          mixBlendMode: 'screen',
        }}
      />
    </>
  )
}
