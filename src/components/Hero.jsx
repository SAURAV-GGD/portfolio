import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const phrases = [
  'AI BUILDER & VIBE CODER',
  'PYTHON · OPENCV · MEDIAPIPE',
  'SHIPPING FAST WITH AI TOOLS 🚀',
  'B.TECH CSE @ ARYA COLLEGE 2027',
  'PROMPT ENGINEER · CLOUD CERTIFIED',
  'FROM IDEA → PRODUCT IN HOURS ⚡',
]

const floaters = [
  { text: 'PYTHON',        x: '72%', y: '22%', delay: 0 },
  { text: 'REACT',         x: '82%', y: '52%', delay: 0.4 },
  { text: 'GOOGLE CLOUD',  x: '65%', y: '72%', delay: 0.8 },
  { text: 'AWS',           x: '78%', y: '36%', delay: 1.2 },
  { text: 'SELENIUM',      x: '62%', y: '44%', delay: 0.6 },
  { text: 'MEDIAPIPE',     x: '70%', y: '86%', delay: 1.0 },
]

const floaterColors = ['#FF3131', '#FFD700', '#FF6B35', '#9B59B6', '#F0F0F0', '#FF3131']

function GlitchText() {
  const [idx, setIdx]     = useState(0)
  const [text, setText]   = useState('')
  const [del, setDel]     = useState(false)
  const timeout           = useRef(null)

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

const stag = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } } }

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">

      {/* noise texture bg */}
      <div className="absolute inset-0 noise-bg opacity-100 pointer-events-none" />

      {/* radial glow top */}
      <div className="absolute inset-0 glow-radial pointer-events-none" />

      {/* corner accents — street style */}
      <div className="absolute top-20 left-0 w-44 h-[2px] bg-gradient-to-r from-sm-red to-transparent" />
      <div className="absolute top-20 left-0 h-44 w-[2px] bg-gradient-to-b from-sm-red to-transparent" />
      <div className="absolute bottom-20 right-0 w-44 h-[2px] bg-gradient-to-l from-sm-gold to-transparent" />
      <div className="absolute bottom-20 right-0 h-44 w-[2px] bg-gradient-to-t from-sm-gold to-transparent" />

      {/* large background text — oversized impact */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[20vw] text-white/[0.02] tracking-wider leading-none">
          SAURAV
        </span>
      </div>

      {/* floating tech badges */}
      <div className="hidden lg:block">
        {floaters.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: f.delay + 1.2, duration: 0.5 }}
            style={{ position: 'absolute', left: f.x, top: f.y }}
            className="animate-float"
          >
            <div
              className="font-mono text-[10px] tracking-[3px] px-3 py-1.5 rounded glass"
              style={{
                color: floaterColors[i],
                border: `1px solid ${floaterColors[i]}30`,
                boxShadow: `0 0 15px ${floaterColors[i]}15`,
                animationDelay: `${f.delay}s`,
              }}
            >
              {f.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* main content */}
      <motion.div
        className="relative z-10 px-6 md:px-16 max-w-5xl"
        variants={stag}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="font-mono text-[11px] tracking-[5px] text-sm-red/60 mb-6 uppercase">
          » HELLO WORLD · JAIPUR, INDIA
        </motion.div>

        <motion.h1 variants={item} className="font-display leading-[0.9] mb-5">
          <span className="block text-white/20 text-xl md:text-2xl tracking-[8px] font-mono font-normal mb-3">
            I&apos;M
          </span>
          <span
            className="block text-6xl md:text-8xl lg:text-[8rem] text-white hero-name tracking-wider"
            style={{ textShadow: '0 0 80px rgba(255,49,49,0.12)' }}
          >
            SAURAV
          </span>
          <span
            className="block text-6xl md:text-8xl lg:text-[8rem] sm-red hero-name tracking-wider"
            style={{ textShadow: '0 0 80px #FF313140' }}
          >
            KUMAR
          </span>
        </motion.h1>

        {/* red underline accent */}
        <motion.div variants={item} className="w-24 h-[3px] bg-gradient-to-r from-sm-red to-sm-gold mb-6" />

        <motion.div variants={item} className="font-mono text-sm md:text-base mt-2 h-7">
          <span className="text-sm-red/40">» </span>
          <GlitchText />
        </motion.div>

        <motion.p variants={item} className="mt-7 text-white/45 font-body text-base md:text-lg max-w-xl leading-relaxed">
          B.Tech CSE student at Arya College, Jaipur (2027). I don't just write code — I orchestrate AI tools to ship real products fast. Vibe coder. Builder. Lifter.
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
            href="https://github.com/Godgiftedevil"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 glass glow-border-red font-mono text-sm text-sm-red tracking-[2px] rounded hover:scale-105 transition-all duration-300"
          >
            GITHUB ↗
          </a>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-7 py-3.5 glass border border-white/10 font-mono text-sm text-white/50 tracking-[2px] rounded hover:text-white hover:border-white/25 transition-all duration-300"
          >
            ↓ RESUME
          </a>
        </motion.div>

        {/* stats row */}
        <motion.div variants={item} className="flex flex-wrap gap-8 md:gap-12 mt-16">
          {[
            { num: '8+', label: 'CERTIFICATIONS' },
            { num: '4+', label: 'PROJECTS SHIPPED' },
            { num: '2027', label: 'GRADUATING' },
            { num: '∞', label: 'VIBE LEVEL' },
          ].map(s => (
            <div key={s.label} className="group">
              <div className="font-display text-4xl sm-red group-hover:text-sm-gold transition-colors duration-300">{s.num}</div>
              <div className="font-mono text-[10px] text-white/25 tracking-[3px] mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] tracking-[4px] text-white/15 uppercase">SCROLL</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-sm-red/50 to-transparent"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </section>
  )
}
