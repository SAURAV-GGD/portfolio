import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'ABOUT',    href: '#about'    },
  { label: 'SKILLS',   href: '#skills'   },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CERTS',    href: '#certs'    },
  { label: 'EXP',      href: '#exp'      },
  { label: 'CONTACT',  href: '#contact'  },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

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
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 md:px-14 py-4 transition-all duration-500 ${
          scrolled
            ? 'bg-void/90 backdrop-blur-2xl border-b border-sm-red/10'
            : 'bg-transparent'
        }`}
      >
        {/* logo */}
        <a href="#hero" className="font-display text-2xl tracking-wider group">
          <span className="sm-red">S</span>
          <span className="text-white/80">K</span>
          <span className="inline-block w-5 h-[3px] bg-sm-red ml-1 mb-1 group-hover:w-8 transition-all duration-300" />
        </a>

        {/* desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={`font-mono text-[11px] tracking-[3px] transition-all duration-300 relative animated-underline ${
                  active === href.slice(1)
                    ? 'text-sm-red'
                    : 'text-white/35 hover:text-white/80'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* hire me CTA */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 px-5 py-2 font-display text-sm tracking-[3px] text-void bg-sm-red rounded hover:bg-sm-gold hover:text-void transition-all duration-300 hover:scale-105"
          style={{ boxShadow: '0 0 25px #FF313150' }}
        >
          HIRE ME
        </a>

        {/* mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-sm-red transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-sm-red transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-sm-red transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </motion.nav>

      {/* mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[499] bg-void/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`font-display text-3xl tracking-[6px] transition-colors ${
                  active === href.slice(1) ? 'text-sm-red' : 'text-white/40 hover:text-white'
                }`}
              >
                {label}
              </motion.a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 px-8 py-3 bg-sm-red text-void font-display text-lg tracking-[4px] rounded hover:bg-sm-gold transition-colors"
            >
              HIRE ME
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
