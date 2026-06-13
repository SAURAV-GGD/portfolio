import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState, useEffect, useMemo, useCallback, memo } from 'react'
import { skills } from '../data/index.js'

/* ═══════════════════════════════════════════════════════
   CATEGORY COLOR ZONES — distinct neon per group
═══════════════════════════════════════════════════════ */

const groupColors = {
  'AI & Machine Learning': { color: '#FF3131', glow: '#FF313160' },
  'Web & Frontend':        { color: '#22D3EE', glow: '#22D3EE60' },
  'Cloud & DevOps':        { color: '#A78BFA', glow: '#A78BFA60' },
  'Automation & Tools':    { color: '#FB923C', glow: '#FB923C60' },
  'Data & Analytics':      { color: '#34D399', glow: '#34D39960' },
  'Low-Level & Backend':   { color: '#FBBF24', glow: '#FBBF2460' },
  'Blockchain & Web3':     { color: '#F472B6', glow: '#F472B660' },
}

/* ═══════════════════════════════════════════════════════
   COLLECT TECHS WITH CATEGORY INFO
═══════════════════════════════════════════════════════ */

function collectTechs() {
  const result = []
  Object.entries(skills).forEach(([group, tags]) => {
    const { color, glow } = groupColors[group] || { color: '#FF3131', glow: '#FF313160' }
    tags.forEach(tag => {
      if (!result.find(r => r.name === tag)) {
        result.push({ name: tag, color, glow, group })
      }
    })
  })
  return result
}

/* ═══════════════════════════════════════════════════════
   3D SPHERE MATH — distribute points on a sphere
   using Fibonacci spiral for even distribution
═══════════════════════════════════════════════════════ */

function fibonacciSphere(count) {
  const points = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2 // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    const x = Math.cos(theta) * radiusAtY
    const z = Math.sin(theta) * radiusAtY
    points.push({ x, y, z })
  }
  return points
}

/* ═══════════════════════════════════════════════════════
   CATEGORY LEGEND
═══════════════════════════════════════════════════════ */

function CategoryLegend({ visible }) {
  const cats = Object.entries(groupColors)
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-8 md:mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 0.7 : 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {cats.map(([name, { color }]) => (
        <div key={name} className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />
          <span className="font-mono text-[10px] text-white/50 tracking-wider">
            {name}
          </span>
        </div>
      ))}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   GOD VIDEO BACKGROUND — full section cover
═══════════════════════════════════════════════════════ */

const GodVideoBackground = memo(function GodVideoBackground({ visible }) {
  const videoRef = useRef(null)
  const started = useRef(false)

  // Set critical attributes at DOM level for iOS Safari
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.setAttribute('playsinline', '')
    vid.setAttribute('webkit-playsinline', '')
    vid.setAttribute('muted', '')
    vid.muted = true
    vid.loop = true
    vid.playsInline = true
  }, [])

  // Start playing when section becomes visible
  useEffect(() => {
    const vid = videoRef.current
    if (!vid || !visible || started.current) return

    started.current = true
    vid.currentTime = 0

    const tryPlay = () => {
      vid.muted = true
      const p = vid.play()
      if (p && p.catch) p.catch(() => {})
    }

    tryPlay()

    // Fallback: if autoplay blocked, retry on first user interaction (touch or click)
    const retryOnInteraction = () => {
      tryPlay()
      document.removeEventListener('touchstart', retryOnInteraction)
      document.removeEventListener('click', retryOnInteraction)
    }
    document.addEventListener('touchstart', retryOnInteraction, { once: true, passive: true })
    document.addEventListener('click', retryOnInteraction, { once: true })

    return () => {
      document.removeEventListener('touchstart', retryOnInteraction)
      document.removeEventListener('click', retryOnInteraction)
    }
  }, [visible])

  // Persistent watchdog: keep the video playing no matter what
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    const watchdog = setInterval(() => {
      if (started.current && vid.paused) {
        vid.muted = true
        vid.play().catch(() => {})
      }
      if (vid.duration && vid.currentTime >= vid.duration - 0.1) {
        vid.currentTime = 0
      }
    }, 500)

    return () => clearInterval(watchdog)
  }, [])

  return (
    <motion.div
      className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.5 }}
    >
      {/* Full-section video — mobile-safe attributes */}
      <video
        ref={videoRef}
        src="/GOD.mp4"
        loop
        muted
        playsInline
        preload="auto"
        webkit-playsinline=""
        x-webkit-airplay="deny"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.45) contrast(1.15)', pointerEvents: 'none' }}
      />
      {/* Dark gradient overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center 40%, transparent 20%, rgba(10,10,10,0.65) 60%, rgba(10,10,10,0.9) 100%)',
        }}
      />
      {/* Top + bottom fade to blend with adjacent sections */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-void to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </motion.div>
  )
})

/* ═══════════════════════════════════════════════════════
   3D TAG CLOUD SPHERE
═══════════════════════════════════════════════════════ */

function TagCloudSphere({ techs }) {
  const containerRef = useRef(null)
  const rotationRef = useRef({ x: 0.0007, y: 0.0018 })
  const anglesRef = useRef({ ax: 0, ay: 0 })
  const rafRef = useRef(null)
  const [positions, setPositions] = useState([])
  const [hoveredIdx, setHoveredIdx] = useState(-1)
  const isDragging = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })
  const spherePoints = useMemo(() => fibonacciSphere(techs.length), [techs.length])
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const RADIUS = isMobile ? 170 : 320

  // Project 3D → 2D with perspective
  const project = useCallback(() => {
    const { ax, ay } = anglesRef.current
    const cosAx = Math.cos(ax), sinAx = Math.sin(ax)
    const cosAy = Math.cos(ay), sinAy = Math.sin(ay)

    const projected = spherePoints.map((p) => {
      // Rotate around Y axis
      let x1 = p.x * cosAy - p.z * sinAy
      let z1 = p.x * sinAy + p.z * cosAy
      let y1 = p.y
      // Rotate around X axis
      let y2 = y1 * cosAx - z1 * sinAx
      let z2 = y1 * sinAx + z1 * cosAx

      // Perspective
      const fov = 600
      const scale = fov / (fov + z2 * RADIUS)
      return {
        x: x1 * RADIUS * scale,
        y: y2 * RADIUS * scale,
        z: z2,
        scale,
      }
    })
    setPositions(projected)
  }, [spherePoints, RADIUS])

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (hoveredIdx === -1) {
        anglesRef.current.ax += rotationRef.current.x
        anglesRef.current.ay += rotationRef.current.y
      }
      project()
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [project, hoveredIdx])

  // Mouse drag to rotate
  const handleMouseDown = (e) => {
    isDragging.current = true
    lastMouse.current = { x: e.clientX, y: e.clientY }
  }
  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastMouse.current.x
    const dy = e.clientY - lastMouse.current.y
    anglesRef.current.ay -= dx * 0.004
    anglesRef.current.ax -= dy * 0.004
    lastMouse.current = { x: e.clientX, y: e.clientY }
  }
  const handleMouseUp = () => { isDragging.current = false }

  // Touch drag to rotate
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return
    isDragging.current = true
    lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const handleTouchMove = (e) => {
    if (!isDragging.current || e.touches.length !== 1) return
    const dx = e.touches[0].clientX - lastMouse.current.x
    const dy = e.touches[0].clientY - lastMouse.current.y
    anglesRef.current.ay -= dx * 0.004
    anglesRef.current.ax -= dy * 0.004
    lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const handleTouchEnd = () => { isDragging.current = false }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[800px] h-[400px] md:h-[700px] flex items-center justify-center"
      style={{ cursor: isDragging.current ? 'grabbing' : 'grab', perspective: '800px' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >

      {positions.map((pos, i) => {
        const tech = techs[i]
        if (!pos) return null

        // Depth-based effects: items behind the sphere are dimmer/smaller
        const depthOpacity = Math.max(0.15, (pos.z + 1) / 2) // 0.15 → 1
        const depthScale = 0.6 + (pos.z + 1) * 0.25 // 0.6 → 1.1
        const isHovered = hoveredIdx === i
        const zIndex = Math.round((pos.z + 1) * 50) + (isHovered ? 200 : 0)

        return (
          <div
            key={tech.name}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) scale(${isHovered ? 1.4 : depthScale})`,
              opacity: isHovered ? 1 : depthOpacity,
              zIndex,
              transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
              pointerEvents: depthOpacity > 0.3 ? 'auto' : 'none',
            }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(-1)}
          >
            {/* Tooltip */}
            {isHovered && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none"
                style={{ zIndex: 300 }}
              >
                <div
                  className="px-3 py-1.5 rounded-lg whitespace-nowrap font-mono text-[10px] tracking-wider"
                  style={{
                    background: 'rgba(10,10,10,0.95)',
                    border: `1px solid ${tech.color}40`,
                    color: tech.color,
                    boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 15px ${tech.glow}`,
                  }}
                >
                  {tech.group}
                </div>
              </div>
            )}

            {/* Tech label */}
            <div
              className="font-mono text-[10px] md:text-sm font-bold tracking-widest px-4 py-2 rounded-md whitespace-nowrap select-none"
              style={{
                color: tech.color,
                background: `rgba(10,10,10,${isHovered ? 0.95 : 0.7})`,
                border: `1px solid ${tech.color}${isHovered ? '60' : '15'}`,
                textShadow: `0 0 ${isHovered ? 20 : 8}px ${tech.glow}`,
                boxShadow: isHovered
                  ? `0 0 20px ${tech.glow}, inset 0 0 10px ${tech.glow}`
                  : `0 0 8px ${tech.glow}`,
                transition: 'all 0.2s ease-out',
              }}
            >
              {tech.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT — TECH STACK SECTION
═══════════════════════════════════════════════════════ */

export default function TechStack() {
  const [phase, setPhase] = useState('idle')
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })
  const triggered = useRef(false)

  const allTechs = useMemo(() => collectTechs(), [])

  useEffect(() => {
    if (!inView || triggered.current) return
    triggered.current = true

    // Skip heavy animation on mobile for performance
    if (window.innerWidth < 768) {
      setPhase('sphere')
      return
    }

    setPhase('blackout')

    const timers = [
      setTimeout(() => setPhase('scanning'), 400),
      setTimeout(() => setPhase('implode'), 1200),
      setTimeout(() => setPhase('flash'), 2500),
      setTimeout(() => setPhase('sphere'), 2900),
    ]

    return () => timers.forEach(clearTimeout)
  }, [inView])

  return (
    <section id="tech-stack" ref={sectionRef} className="relative py-20 px-6 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-void">
      
      {/* ── GOD VIDEO BACKGROUND ── */}
      <GodVideoBackground visible={phase === 'sphere'} />

      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 noise-bg opacity-40 pointer-events-none" />

      {/* ── SECTION HEADER ── */}
      <motion.div 
        className="absolute top-28 left-6 md:left-16 z-[10]"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'sphere' ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex items-center gap-5">
          <span className="font-mono text-xs text-sm-red/40 tracking-[4px]">02</span>
          <h2 className="font-display text-3xl md:text-4xl text-white tracking-[3px] uppercase">
            TECH I USED
          </h2>
          <div className="w-24 md:w-32 h-[2px] bg-gradient-to-r from-sm-red/20 to-transparent" />
        </div>
      </motion.div>


      {/* ── ANIMATION OVERLAY ── */}
      <AnimatePresence>
        {phase !== 'idle' && phase !== 'sphere' && (
          <motion.div
            key="nuke-blackout"
            className="fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'flash' ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: phase === 'flash' ? 0.3 : 0.4 }}
          >
            {/* Scanlines on top of blackout */}
            <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-50" />

            {/* Phase: SCANNING */}
            {phase === 'scanning' && (
              <motion.div
                className="flex flex-col items-center gap-5 relative z-10"
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="scan-line-anim w-64 h-[2px] bg-sm-red opacity-50" />
                <span className="font-mono text-sm tracking-[10px] text-sm-red neon-pulse-text font-bold">
                  WARNING: SYSTEM OVERRIDE
                </span>
                <div className="scan-line-anim w-64 h-[2px] bg-sm-red opacity-50" />
              </motion.div>
            )}

            {/* Phase: IMPLODE (Energy gathering) */}
            {phase === 'implode' && (
              <motion.div className="absolute w-full h-full inset-0 overflow-hidden pointer-events-none">
                  {/* Particles flying into center */}
                  {Array.from({length: 80}).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-sm-red rounded-full"
                      style={{ boxShadow: '0 0 15px #ff3131, 0 0 30px #ff3131' }}
                      initial={{ 
                        left: `${Math.random()*100}%`, 
                        top: `${Math.random()*100}%`, 
                        scale: Math.random() * 2 + 1 
                      }}
                      animate={{ left: '50%', top: '50%', scale: 0 }}
                      transition={{ 
                        duration: 0.8 + Math.random() * 0.5, 
                        ease: "anticipate"
                      }}
                    />
                  ))}
                  
                  {/* Core gathering energy */}
                  <motion.div 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
                    initial={{ width: 0, height: 0, background: 'rgba(255,49,49,0.8)' }}
                    animate={{ width: 200, height: 200, background: 'rgba(255,255,255,1)' }}
                    transition={{ duration: 1.3, ease: 'easeIn' }}
                    style={{ filter: 'blur(20px)' }}
                  />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── THE NUCLEAR FLASH FULL SCREEN BLAST (only for split second) ── */}
      <AnimatePresence>
        {phase === 'flash' && (
           <motion.div 
              className="fixed inset-0 z-[9999] bg-white pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
           />
        )}
      </AnimatePresence>


      {/* ── SPHERE PHASE: 3D TAG CLOUD ── */}
      <motion.div 
        className="relative z-[5] w-full flex-grow flex flex-col items-center justify-center mt-20 md:mt-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: phase === 'sphere' ? 1 : 0, scale: phase === 'sphere' ? 1 : 0.5 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <TagCloudSphere techs={allTechs} />

        {/* Drag hint */}
        <motion.p
          className="font-mono text-[10px] text-white/20 tracking-[4px] mt-4 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'sphere' ? 1 : 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          DRAG TO ROTATE
        </motion.p>

        {/* Category legend */}
        <CategoryLegend visible={phase === 'sphere'} />
      </motion.div>
    </section>
  )
}
