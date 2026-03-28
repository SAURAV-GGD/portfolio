import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const phrases = [
  'AI Builder & Vibe Coder',
  'Python · OpenCV · MediaPipe',
  'Shipping fast with AI tools 🚀',
  'B.Tech CSE @ Arya College 2027',
  'Prompt Engineer · Cloud Certified',
  'From idea → product in hours ⚡',
]

const floaters = [
  { text: 'Python',        x: '72%', y: '22%', color: '#c8ff57', delay: 0 },
  { text: 'React',         x: '80%', y: '55%', color: '#00d4ff', delay: 0.4 },
  { text: 'Google Cloud',  x: '65%', y: '70%', color: '#34a853', delay: 0.8 },
  { text: 'AWS',           x: '78%', y: '38%', color: '#ff9500', delay: 1.2 },
  { text: 'Selenium',      x: '62%', y: '42%', color: '#bf7aff', delay: 0.6 },
  { text: 'MediaPipe',     x: '68%', y: '84%', color: '#ff2d78', delay: 1.0 },
]

function TypedText() {
  const [idx, setIdx]     = useState(0)
  const [text, setText]   = useState('')
  const [del, setDel]     = useState(false)
  const timeout           = useRef(null)

  useEffect(() => {
    const phrase = phrases[idx]
    if (!del) {
      if (text.length < phrase.length) {
        timeout.current = setTimeout(() => setText(phrase.slice(0, text.length + 1)), 60)
      } else {
        timeout.current = setTimeout(() => setDel(true), 2000)
      }
    } else {
      if (text.length > 0) {
        timeout.current = setTimeout(() => setText(text.slice(0, -1)), 28)
      } else {
        setDel(false)
        setIdx(i => (i + 1) % phrases.length)
      }
    }
    return () => clearTimeout(timeout.current)
  }, [text, del, idx])

  return (
    <span>
      <span className="text-white/70">{text}</span>
      <span className="neon-lime animate-[blink_1s_infinite]">█</span>
    </span>
  )
}

const stag = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">

      {/* pixel grid bg */}
      <div className="absolute inset-0 pixel-bg opacity-100 pointer-events-none" />

      {/* radial glow top */}
      <div className="absolute inset-0 glow-radial pointer-events-none" />

      {/* corner accents */}
      <div className="absolute top-20 left-0 w-40 h-px bg-gradient-to-r from-neon-lime to-transparent" />
      <div className="absolute top-20 left-0 h-40 w-px bg-gradient-to-b from-neon-lime to-transparent" />
      <div className="absolute bottom-20 right-0 w-40 h-px bg-gradient-to-l from-neon-pink to-transparent" />
      <div className="absolute bottom-20 right-0 h-40 w-px bg-gradient-to-t from-neon-pink to-transparent" />

      {/* floating tech badges */}
      <div className="hidden lg:block">
        {floaters.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: f.delay + 1, duration: 0.5 }}
            style={{ position: 'absolute', left: f.x, top: f.y }}
            className="animate-float"
          >
            <div
              className="font-mono text-xs px-3 py-1.5 rounded glass"
              style={{
                color: f.color,
                border: `1px solid ${f.color}40`,
                boxShadow: `0 0 12px ${f.color}25`,
                animationDelay: `${f.delay}s`,
              }}
            >
              {'>'} {f.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* main content */}
      <motion.div
        className="relative z-10 px-8 md:px-16 max-w-4xl"
        variants={stag}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="font-mono text-xs tracking-[4px] text-neon-lime/70 mb-5">
          // HELLO WORLD · JAIPUR, INDIA
        </motion.div>

        <motion.h1 variants={item} className="font-display font-extrabold leading-none mb-4">
          <span className="block text-white/20 text-2xl md:text-3xl tracking-widest font-mono mb-2">
            I&apos;m
          </span>
          <span
            className="block text-6xl md:text-8xl lg:text-[7rem] text-white"
            style={{ textShadow: '0 0 60px rgba(200,255,87,0.15)' }}
          >
            Saurav
          </span>
          <span className="block text-6xl md:text-8xl lg:text-[7rem] neon-lime" style={{ textShadow: '0 0 60px #c8ff5770' }}>
            Kumar
          </span>
        </motion.h1>

        <motion.div variants={item} className="font-mono text-sm md:text-base mt-4 h-7">
          <span className="text-neon-lime/50">$&gt; </span>
          <TypedText />
        </motion.div>

        <motion.p variants={item} className="mt-6 text-white/50 font-body text-base md:text-lg max-w-xl leading-relaxed">
          B.Tech CSE student at Arya College, Jaipur (2027). I don't just write code — I orchestrate AI tools to ship real products fast. Vibe coder. Builder. Lifter.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-4 mt-10">
          <a
            href="#projects"
            className="flex items-center gap-2 px-6 py-3 bg-neon-lime text-void font-display font-bold text-sm tracking-wider rounded hover:scale-105 transition-transform"
            style={{ boxShadow: '0 0 28px #c8ff5750' }}
          >
            view_projects →
          </a>
          <a
            href="https://github.com/Godgiftedevil"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 glass neon-border-lime font-mono text-sm text-neon-lime tracking-wider rounded hover:scale-105 transition-transform"
          >
            github ↗
          </a>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-6 py-3 glass border border-white/10 font-mono text-sm text-white/60 tracking-wider rounded hover:text-white hover:border-white/30 transition-all"
          >
            ↓ resume
          </a>
        </motion.div>

        {/* stats row */}
        <motion.div variants={item} className="flex flex-wrap gap-8 mt-14">
          {[
            { num: '8+', label: 'Certifications' },
            { num: '4+', label: 'Projects Shipped' },
            { num: '2027', label: 'Graduating' },
            { num: '∞', label: 'Vibe Level' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-display font-bold text-3xl neon-lime">{s.num}</div>
              <div className="font-mono text-xs text-white/30 tracking-widest mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-[3px] text-white/20">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-neon-lime/60 to-transparent" />
      </div>
    </section>
  )
}
