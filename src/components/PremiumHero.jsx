import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

/* ──────────── Scramble Letters Animation ──────────── */
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?+='


function SwipeLetters({ text, className = '', style = {}, totalDuration = 2200, staggerSpread = 600 }) {
  const chars = Array.from(text).map(c => c === ' ' ? '\u00a0' : c)
  const letterRefs = useRef([])
  const containerRef = useRef(null)
  const hasPlayed = useRef(false)

  // Each letter gets a unique scramble duration + stagger delay
  // Earlier letters resolve sooner, later letters scramble longer
  const getLetterConfig = useCallback((i) => {
    const baseDelay = (i / chars.length) * staggerSpread
    // Each letter scrambles for progressively longer time
    const scrambleTime = totalDuration - baseDelay + (Math.random() * 200 - 100)
    return { delay: baseDelay, scrambleDuration: Math.max(500, scrambleTime) }
  }, [chars.length, totalDuration, staggerSpread])

  // Trigger all letters to scramble
  const triggerScramble = useCallback(() => {
    letterRefs.current.forEach(ref => {
      if (ref && ref.startScramble) ref.startScramble()
    })
  }, [])

  // Auto-play on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerScramble()
      hasPlayed.current = true
    }, 500)
    return () => clearTimeout(timer)
  }, [triggerScramble])

  // Replay on hover
  const handleEnter = () => {
    if (hasPlayed.current) {
      triggerScramble()
    }
  }

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ display: 'inline-flex', ...style }}
      onMouseEnter={handleEnter}
    >
      {chars.map((ch, i) => {
        const config = getLetterConfig(i)
        return (
          <ScrambleLetterCell
            key={`${ch}-${i}`}
            target={ch}
            delay={config.delay}
            scrambleDuration={config.scrambleDuration}
            registerRef={(ref) => { letterRefs.current[i] = ref }}
          />
        )
      })}
    </span>
  )
}

function ScrambleLetterCell({ target, delay, scrambleDuration, registerRef }) {
  const [display, setDisplay] = useState('')
  const intervalRef = useRef(null)
  const timeoutRef1 = useRef(null)
  const timeoutRef2 = useRef(null)

  const startScramble = useCallback(() => {
    setDisplay('')
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef1.current) clearTimeout(timeoutRef1.current)
    if (timeoutRef2.current) clearTimeout(timeoutRef2.current)

    timeoutRef1.current = setTimeout(() => {
      setDisplay(SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])

      intervalRef.current = setInterval(() => {
        setDisplay(SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)])
      }, 55)

      timeoutRef2.current = setTimeout(() => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplay(target)
      }, scrambleDuration)
    }, delay)
  }, [target, delay, scrambleDuration])

  useEffect(() => {
    registerRef({ startScramble })
  }, [startScramble, registerRef])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef1.current) clearTimeout(timeoutRef1.current)
      if (timeoutRef2.current) clearTimeout(timeoutRef2.current)
    }
  }, [])

  return (
    <span
      style={{
        display: 'inline-block',
        minWidth: target === '\u00a0' ? '0.3em' : undefined,
        opacity: display ? 1 : 0,
        transition: 'opacity 0.12s ease',
      }}
    >
      {display || target}
    </span>
  )
}

/* ──────────── Typewriter Phrases ──────────── */
const phrases = [
  'AI BUILDER & VIBE CODER',
  'PYTHON · OPENCV · MEDIAPIPE',
  'SHIPPING FAST WITH AI TOOLS 🚀',
  'B.TECH CSE @ ARYA COLLEGE 2027',
  'PROMPT ENGINEER · CLOUD CERTIFIED',
  'FROM IDEA → PRODUCT IN HOURS ⚡',
]

function GlitchText() {
  const [idx, setIdx]   = useState(0)
  const [text, setText] = useState('')
  const [del, setDel]   = useState(false)
  const timeout         = useRef(null)

  useEffect(() => {
    const phrase = phrases[idx]
    if (!del) {
      if (text.length < phrase.length) {
        timeout.current = setTimeout(() => setText(phrase.slice(0, text.length + 1)), 45)
      } else {
        timeout.current = setTimeout(() => setDel(true), 2200)
      }
    } else {
      if (text.length > 0) {
        timeout.current = setTimeout(() => setText(text.slice(0, -1)), 22)
      } else {
        setDel(false)
        setIdx(i => (i + 1) % phrases.length)
      }
    }
    return () => clearTimeout(timeout.current)
  }, [text, del, idx])

  return (
    <span>
      <span className="text-white/60">{text}</span>
      <span className="sm-red animate-[blink_1s_infinite]">▌</span>
    </span>
  )
}

/* ──────────── Word-level highlight on cursor proximity ──────────── */
function InteractiveText({ children, className = '', style = {} }) {
  const containerRef = useRef(null)
  const [nearWord, setNearWord] = useState(-1)

  const words = children.split(' ')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouse = (e) => {
      const spans = container.querySelectorAll('.hover-word')
      let closest = -1
      let minDist = 120

      spans.forEach((span, i) => {
        const rect = span.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2)
        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      })
      setNearWord(closest)
    }

    const handleLeave = () => setNearWord(-1)

    container.addEventListener('mousemove', handleMouse)
    container.addEventListener('mouseleave', handleLeave)
    return () => {
      container.removeEventListener('mousemove', handleMouse)
      container.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <span ref={containerRef} className={className} style={style}>
      {words.map((word, i) => (
        <span key={i}>
          <span
            className="hover-word"
            style={{
              transition: 'color 0.25s ease, text-shadow 0.25s ease',
              color: nearWord === i ? '#FFFFFF' : undefined,
              textShadow: nearWord === i
                ? '0 0 20px rgba(255,49,49,0.4), 0 0 40px rgba(255,49,49,0.15)'
                : 'none',
            }}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

/* ──────────── Motion Variants ──────────── */
const stag = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

/* ════════════════════════════════════════════
   HERO SECTION — Identical to deployed version
   + GSAP-powered image reveal effect on portrait
   ════════════════════════════════════════════ */
export default function PremiumHero() {
  /* ── Reveal refs (the ONLY additions) ── */
  const portraitRef  = useRef(null)
  const topLayerRef  = useRef(null)

  /* ── GSAP Reveal Effect ── */
  useEffect(() => {
    const container = portraitRef.current
    const topLayer  = topLayerRef.current
    if (!container || !topLayer) return

    // Respect reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // Internal state — no React rerenders
    const s = {
      smoothX: 0,
      smoothY: 0,
      radius: 0,
      isHovering: false,
    }

    // Base masks (exact copy of the original inline CSS masks)
    const leftFade  = 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.7) 55%, transparent 80%)'
    const bottomFade = 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 8%, rgba(0,0,0,1) 20%)'
    const baseMask   = `${leftFade}, ${bottomFade}`

    // GPU hints for smooth mask updates
    topLayer.style.willChange = 'mask-image, -webkit-mask-image'
    topLayer.style.backfaceVisibility = 'hidden'

    // Smooth cursor tracking via GSAP quickTo
    const xProxy = { value: 0 }
    const yProxy = { value: 0 }
    const quickX = gsap.quickTo(xProxy, 'value', {
      duration: 0.4, ease: 'power2.out',
      onUpdate: () => { s.smoothX = xProxy.value },
    })
    const quickY = gsap.quickTo(yProxy, 'value', {
      duration: 0.4, ease: 'power2.out',
      onUpdate: () => { s.smoothY = yProxy.value },
    })

    // Apply combined mask: base fade + reveal hole
    const applyMask = () => {
      const r = s.radius
      if (r < 0.5) {
        // No reveal — restore exact original masks
        topLayer.style.maskImage = baseMask
        topLayer.style.webkitMaskImage = baseMask
        topLayer.style.maskComposite = 'intersect'
        topLayer.style.webkitMaskComposite = 'destination-in'
        return
      }

      // Radial hole: transparent center → reveals bottom layer through the top
      const hole = `radial-gradient(circle ${r}px at ${s.smoothX}px ${s.smoothY}px, ` +
        `transparent 0%, transparent ${r * 0.55}px, rgba(0,0,0,0.3) ${r * 0.75}px, rgba(0,0,0,1) ${r}px)`

      // 3 mask layers intersected: hole ∩ leftFade ∩ bottomFade
      topLayer.style.maskImage = `${hole}, ${baseMask}`
      topLayer.style.webkitMaskImage = `${hole}, ${baseMask}`
      topLayer.style.maskComposite = 'intersect, intersect'
      topLayer.style.webkitMaskComposite = 'destination-in, destination-in'
    }

    // GSAP ticker → 60fps mask updates
    const tickerFn = () => {
      if (!s.isHovering && s.radius <= 0.5) return
      applyMask()
    }
    gsap.ticker.add(tickerFn)

    // ── Mouse handlers ──
    const onMove = (e) => {
      const rect = container.getBoundingClientRect()
      quickX(e.clientX - rect.left)
      quickY(e.clientY - rect.top)
    }

    const onEnter = () => {
      s.isHovering = true
      gsap.to(s, {
        radius: 150,
        duration: 0.6,
        ease: 'power3.out',
      })
    }

    const onLeave = () => {
      s.isHovering = false
      gsap.to(s, {
        radius: 0,
        duration: 0.8,
        ease: 'power2.in',
        onUpdate: applyMask,
        onComplete: applyMask,
      })
    }

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseenter', onEnter)
    container.addEventListener('mouseleave', onLeave)

    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseenter', onEnter)
      container.removeEventListener('mouseleave', onLeave)
      gsap.ticker.remove(tickerFn)
      // Restore original masks on cleanup
      topLayer.style.maskImage = baseMask
      topLayer.style.webkitMaskImage = baseMask
      topLayer.style.maskComposite = 'intersect'
      topLayer.style.webkitMaskComposite = 'destination-in'
      topLayer.style.willChange = ''
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* noise texture bg */}
      <div className="absolute inset-0 noise-bg opacity-100 pointer-events-none" />

      {/* radial glow top */}
      <div className="absolute inset-0 glow-radial pointer-events-none" />

      {/* ── BLURRED BG IMAGE — subtle atmosphere ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[0]"
        style={{
          backgroundImage: 'url(/saurav-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
          filter: 'blur(20px) grayscale(0.4) brightness(0.5)',
        }}
      />

      {/* ── FACE IMAGE — large, static, pinned top-right to bottom-right ──
           Spans from the top of the section to where the gold accent lines
           start (bottom: ~80px). Full opacity, no transparency on the face.
           pointer-events enabled ONLY for reveal mouse tracking. */}
      <div
        ref={portraitRef}
        className="absolute z-[1]"
        style={{
          top: 0,
          right: 0,
          bottom: '80px',
          width: '48%',
          maxWidth: '700px',
        }}
      >
        {/* ── BOTTOM LAYER: hero-rvl.png — always present underneath ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/hero-rvl.png)',
            backgroundSize: 'cover',
            backgroundPosition: '50% 15%',
            filter: 'contrast(1.15) brightness(0.9)',
            maskImage:
              'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.7) 55%, transparent 80%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 8%, rgba(0,0,0,1) 20%)',
            WebkitMaskImage:
              'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.7) 55%, transparent 80%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 8%, rgba(0,0,0,1) 20%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'destination-in',
          }}
        />

        {/* ── TOP LAYER: saurav-hero.jpg — reveal mask applied via GSAP ── */}
        <div
          ref={topLayerRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/saurav-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: '50% 15%',
            opacity: 1,
            filter: 'contrast(1.15) brightness(0.9)',
            maskImage:
              'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.7) 55%, transparent 80%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 8%, rgba(0,0,0,1) 20%)',
            WebkitMaskImage:
              'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.7) 55%, transparent 80%), linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 8%, rgba(0,0,0,1) 20%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'destination-in',
          }}
        />

        {/* Red accent glow behind face */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '350px',
            height: '350px',
            right: '15%',
            top: '25%',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,49,49,0.15) 0%, rgba(255,107,53,0.06) 50%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Warm color overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(160deg, transparent 30%, rgba(255,49,49,0.05) 60%, rgba(255,107,53,0.03) 100%)',
            maskImage:
              'linear-gradient(to left, rgba(0,0,0,1) 10%, transparent 65%)',
            WebkitMaskImage:
              'linear-gradient(to left, rgba(0,0,0,1) 10%, transparent 65%)',
          }}
        />
      </div>

      {/* ── QUOTE HIGHLIGHT: BLEND WITH BACKGROUND QUOTE ── */}
      <div
        className="absolute pointer-events-none z-[3] select-none"
        style={{
          right: '5%',
          bottom: '12%',
        }}
      >
        <div
          className="font-display text-right leading-[0.92]"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            letterSpacing: '3px',
            color: 'transparent',
          }}
        >
          <span
            className="block"
            style={{
              WebkitTextStroke: '1px rgba(255,49,49,0.2)',
              textShadow: '0 0 30px rgba(255,49,49,0.5), 0 0 60px rgba(255,49,49,0.2)',
            }}
          >
            WORK
          </span>
          <span
            className="block"
            style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.1)',
              textShadow: '0 0 30px rgba(255,255,255,0.2)',
            }}
          >
            SMART
          </span>
          <span
            className="block"
            style={{
              WebkitTextStroke: '1px rgba(255,49,49,0.2)',
              textShadow: '0 0 30px rgba(255,49,49,0.5), 0 0 60px rgba(255,49,49,0.2)',
            }}
          >
            NOT
          </span>
          <span
            className="block"
            style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.1)',
              textShadow: '0 0 30px rgba(255,255,255,0.2)',
            }}
          >
            HARD
          </span>
        </div>
      </div>

      {/* corner accents */}
      <div className="absolute top-20 left-0 w-44 h-[2px] bg-gradient-to-r from-sm-red to-transparent z-[3]" />
      <div className="absolute top-20 left-0 h-44 w-[2px] bg-gradient-to-b from-sm-red to-transparent z-[3]" />
      <div className="absolute bottom-20 right-0 w-44 h-[2px] bg-gradient-to-l from-sm-gold to-transparent z-[3]" />
      <div className="absolute bottom-20 right-0 h-44 w-[2px] bg-gradient-to-t from-sm-gold to-transparent z-[3]" />

      {/* main content — left side */}
      <motion.div
        className="relative z-10 px-6 md:px-16 max-w-3xl"
        variants={stag}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={item}
          className="font-mono text-[11px] tracking-[5px] text-sm-red/60 mb-6 uppercase"
        >
            » HELLO WORLD · BIHAR {'<->'} JAIPUR, INDIA
        </motion.div>

        <motion.h1 variants={item} className="font-display leading-[0.9] mb-5">
          <span className="block text-white/20 text-xl md:text-2xl tracking-[8px] font-mono font-normal mb-3">
            I&apos;M
          </span>
          <span
            className="block text-6xl md:text-8xl lg:text-[8rem] sm-red hero-name tracking-wider"
            style={{ textShadow: '0 0 80px rgba(255,49,49,0.25)' }}
          >
            <SwipeLetters text="SAURAV" direction="alternate" duration={420} stagger={28} />
          </span>
          <span
            className="block text-6xl md:text-8xl lg:text-[8rem] sm-red hero-name tracking-wider"
            style={{ textShadow: '0 0 80px #FF313140' }}
          >
            <SwipeLetters text="KUMAR" direction="alternate" duration={420} stagger={28} />
          </span>
        </motion.h1>

        {/* accent line */}
        <motion.div
          variants={item}
          className="w-24 h-[3px] bg-gradient-to-r from-sm-red to-sm-gold mb-6"
        />

        <motion.div
          variants={item}
          className="font-mono text-sm md:text-base mt-2 h-7"
        >
          <span className="text-sm-red/40">» </span>
          <GlitchText />
        </motion.div>

        {/* Bio text with cursor-proximity word highlighting */}
        <motion.p variants={item} className="mt-7">
          <InteractiveText className="text-white/40 font-body text-base md:text-lg max-w-xl leading-relaxed inline">
            B.Tech CSE student at Arya College, Jaipur (2027). I don&apos;t just write code — I orchestrate AI tools to ship real products fast. Vibe coder. Builder. Lifter.
          </InteractiveText>
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-4 mt-10">
          <a
            href="#projects"
            className="flex items-center gap-2 px-7 py-3.5 bg-sm-red text-white font-display text-sm tracking-[3px] rounded hover:bg-sm-gold hover:text-void transition-all duration-300 hover:scale-105"
            style={{ boxShadow: '0 0 35px #FF313140' }}
          >
            VIEW PROJECTS →
          </a>
          <a
            href="https://github.com/SAURAV-GGD"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 glass glow-border-red font-mono text-sm text-sm-red tracking-[2px] rounded hover:scale-105 transition-all duration-300"
          >
            GITHUB ↗
          </a>
          <a
            href="/Saurav_Kumar_Resume.docx"
            download
            className="flex items-center gap-2 px-7 py-3.5 glass border border-white/10 font-mono text-sm text-white/50 tracking-[2px] rounded hover:text-white hover:border-white/25 transition-all duration-300"
          >
            ↓ RESUME
          </a>
        </motion.div>

        {/* stats */}
        <motion.div
          variants={item}
          className="flex flex-wrap gap-8 md:gap-12 mt-16"
        >
          {[
            { num: '8+', label: 'CERTIFICATIONS' },
            { num: '4+', label: 'PROJECTS SHIPPED' },
            { num: '2027', label: 'GRADUATING' },
            { num: '∞', label: 'VIBE LEVEL' },
          ].map((s) => (
            <div key={s.label} className="group">
              <div className="font-display text-4xl sm-red group-hover:text-sm-gold transition-colors duration-300">
                {s.num}
              </div>
              <div className="font-mono text-[10px] text-white/25 tracking-[3px] mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[5]">
        <span className="font-mono text-[9px] tracking-[4px] text-white/15 uppercase">
          SCROLL
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-sm-red/50 to-transparent"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </section>
  )
}
