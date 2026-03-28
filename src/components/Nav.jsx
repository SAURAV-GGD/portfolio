import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'about',    href: '#about'   },
  { label: 'skills',   href: '#skills'  },
  { label: 'projects', href: '#projects'},
  { label: 'certs',    href: '#certs'   },
  { label: 'exp',      href: '#exp'     },
  { label: 'contact',  href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = document.querySelectorAll('section[id]')
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 130) setActive(s.id)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-8 md:px-14 py-4 transition-all duration-300 ${
        scrolled
          ? 'bg-void/80 backdrop-blur-xl border-b border-neon-lime/10'
          : 'bg-transparent'
      }`}
    >
      {/* logo */}
      <a href="#hero" className="font-display font-bold text-lg tracking-widest">
        <span className="neon-lime">S</span>
        <span className="text-white/70">aurav</span>
        <span className="neon-lime animate-flicker">_</span>
      </a>

      {/* links */}
      <ul className="hidden md:flex items-center gap-8">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className={`font-mono text-xs tracking-[2px] uppercase transition-all duration-200 relative group ${
                active === href.slice(1)
                  ? 'text-neon-lime'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              <span className="text-neon-lime/50 mr-1">//</span>
              {label}
              <span className={`absolute -bottom-1 left-0 h-px bg-neon-lime transition-all duration-300 ${
                active === href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </a>
          </li>
        ))}
      </ul>

      {/* hire me */}
      <a
        href="#contact"
        className="hidden md:flex items-center gap-2 px-4 py-1.5 font-mono text-xs tracking-widest text-void bg-neon-lime rounded hover:scale-105 transition-transform font-semibold"
        style={{ boxShadow: '0 0 20px #c8ff5750' }}
      >
        hire_me
      </a>
    </motion.nav>
  )
}
