import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { createNavEntrance } from '../utils/gsapAnimations'

/* ── Navigation Links ── */
const navLinks = [
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#exp' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Services',   href: '#skills' },
  { label: 'Contact',    href: '#contact' },
]

/* ════════════════════════════════════════════════════════════════
   NAVBAR — VisionOS-inspired floating glassmorphic navbar
   ════════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const navRef = useRef(null)
  const navItemRefs = useRef([])
  const brandRef = useRef(null)
  const overlayRef = useRef(null)
  const mobileMenuRefs = useRef([])
  const dotGridRef = useRef(null)

  // Scroll detection + active section tracking
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

  // Entrance animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      createNavEntrance(
        navRef.current,
        navItemRefs.current.filter(Boolean)
      )
    })
    return () => ctx.revert()
  }, [])

  // Brand hover rotation
  const handleBrandEnter = () => {
    if (brandRef.current) {
      gsap.to(brandRef.current, {
        rotation: 15,
        duration: 0.4,
        ease: 'power3.out',
      })
    }
  }
  const handleBrandLeave = () => {
    if (brandRef.current) {
      gsap.to(brandRef.current, {
        rotation: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
    }
  }

  // Mobile menu toggle with GSAP
  const toggleMenu = () => {
    const opening = !menuOpen
    setMenuOpen(opening)

    if (opening) {
      // Animate overlay in
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current,
          { opacity: 0, backdropFilter: 'blur(0px)' },
          { opacity: 1, backdropFilter: 'blur(24px)', duration: 0.5, ease: 'power3.out' }
        )
      }
      // Stagger menu items
      const items = mobileMenuRefs.current.filter(Boolean)
      if (items.length) {
        gsap.fromTo(items,
          { opacity: 0, y: 30, letterSpacing: '0px' },
          {
            opacity: 1, y: 0, letterSpacing: '6px',
            duration: 0.6, ease: 'power3.out',
            stagger: 0.08, delay: 0.15,
          }
        )
      }
      // Dot grid → X morph
      animateDotGridToX()
    } else {
      // Animate overlay out
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0, duration: 0.4, ease: 'power2.in',
        })
      }
      // X → dot grid morph
      animateXToDotGrid()
    }
  }

  // Dot Grid ↔ X morphing
  const animateDotGridToX = () => {
    const dots = dotGridRef.current?.querySelectorAll('.dot-item')
    if (!dots || dots.length < 4) return

    // 2×2 grid → X shape
    gsap.to(dots[0], { x: 2, y: 2, duration: 0.3, ease: 'power3.inOut' })
    gsap.to(dots[1], { x: -2, y: 2, duration: 0.3, ease: 'power3.inOut' })
    gsap.to(dots[2], { x: 2, y: -2, duration: 0.3, ease: 'power3.inOut' })
    gsap.to(dots[3], { x: -2, y: -2, duration: 0.3, ease: 'power3.inOut' })
  }

  const animateXToDotGrid = () => {
    const dots = dotGridRef.current?.querySelectorAll('.dot-item')
    if (!dots || dots.length < 4) return

    gsap.to(dots, { x: 0, y: 0, duration: 0.3, ease: 'power3.inOut' })
  }

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* ── FLOATING NAVBAR ── */}
      <nav
        ref={navRef}
        className={`fixed top-4 left-4 right-4 z-[500] flex items-center justify-between px-5 md:px-6 py-3 rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-white/[0.02] backdrop-blur-lg border border-white/[0.05]'
        }`}
      >
        {/* ── LEFT: Brand ── */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group cursor-pointer"
          onMouseEnter={handleBrandEnter}
          onMouseLeave={handleBrandLeave}
        >
          {/* SVG Monogram */}
          <div ref={brandRef} className="relative w-8 h-8">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <rect
                x="1" y="1" width="30" height="30" rx="8"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                fill="rgba(255,255,255,0.03)"
              />
              <text
                x="16" y="22"
                textAnchor="middle"
                fill="white"
                fontSize="16"
                fontWeight="700"
                fontFamily="'Space Grotesk', sans-serif"
              >
                S
              </text>
            </svg>
          </div>
          <span className="font-body font-semibold text-sm tracking-[0.15em] text-white/80 hidden sm:block">
            SAURAV
          </span>
        </a>

        {/* ── CENTER: Desktop Navigation ── */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }, i) => {
            const isActive = active === href.slice(1)
            return (
              <li key={label}>
                <a
                  ref={el => { navItemRefs.current[i] = el }}
                  href={href}
                  className={`relative px-4 py-2 rounded-full font-body text-[13px] tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-white bg-white/[0.08]'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
                  }`}
                >
                  {label}
                  {/* Active pill indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-white/50 rounded-full" />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* ── RIGHT: CTA + Mobile Toggle ── */}
        <div className="flex items-center gap-3">
          {/* Available for Work — Desktop */}
          <a
            href="#contact"
            id="nav-cta-available"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/70 text-[13px] font-body tracking-wide transition-all duration-300 hover:bg-white/[0.1] hover:text-white hover:border-white/[0.18] hover:-translate-y-0.5 cursor-pointer"
          >
            {/* Live status dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Available for Work
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center gap-2 p-2 cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="font-mono text-[11px] tracking-[2px] text-white/50 transition-colors duration-200">
              {menuOpen ? 'CLOSE' : 'MENU'}
            </span>
            <div
              ref={dotGridRef}
              className="grid grid-cols-2 gap-[3px]"
            >
              {[0, 1, 2, 3].map(i => (
                <span
                  key={i}
                  className="dot-item w-[3px] h-[3px] rounded-full bg-white/50 transition-colors duration-200"
                />
              ))}
            </div>
          </button>
        </div>
      </nav>

      {/* ── MOBILE FULLSCREEN OVERLAY ── */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[499] flex flex-col items-center justify-center gap-8 md:hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(5,5,5,0.96) 0%, rgba(10,10,10,0.98) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {navLinks.map(({ label, href }, i) => (
            <a
              key={label}
              ref={el => { mobileMenuRefs.current[i] = el }}
              href={href}
              onClick={() => {
                setMenuOpen(false)
                animateXToDotGrid()
              }}
              className={`font-display text-3xl tracking-[6px] transition-all duration-300 cursor-pointer ${
                active === href.slice(1)
                  ? 'text-white'
                  : 'text-white/30 hover:text-white/70 hover:tracking-[10px]'
              }`}
            >
              {label.toUpperCase()}
            </a>
          ))}

          {/* Mobile CTA */}
          <a
            href="#contact"
            onClick={() => {
              setMenuOpen(false)
              animateXToDotGrid()
            }}
            className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-[#050505] font-body font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for Work
          </a>
        </div>
      )}
    </>
  )
}
