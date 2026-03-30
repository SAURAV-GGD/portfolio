import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

/* ── Hover Reveal Link — minhpham style ── */
function RevealLink({ label, hoverLabel, href, external = true, delay = 0, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative block group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: 'none' }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          borderRadius: '4px',
        }}
      >
        {/* Red bar sweeping in from left */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #FF3131, #FF6B35)',
            transform: hovered ? 'translateX(0%)' : 'translateX(-100%)',
            transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            zIndex: 0,
          }}
        />

        {/* Arrow */}
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            color: hovered ? '#0a0a0a' : 'rgba(255,49,49,0.5)',
            transition: 'color 0.35s ease, transform 0.35s ease',
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            fontSize: '14px',
            padding: '0 8px 0 12px',
          }}
        >
          ↗
        </span>

        {/* Text — swaps content on hover */}
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'var(--font-display, "Bebas Neue", sans-serif)',
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            letterSpacing: '3px',
            whiteSpace: 'nowrap',
            padding: '6px 16px 6px 4px',
            color: hovered ? '#0a0a0a' : 'rgba(255,255,255,0.45)',
            fontStyle: hovered ? 'italic' : 'normal',
            fontWeight: hovered ? 700 : 400,
            transition: 'color 0.35s ease',
          }}
        >
          {hovered ? hoverLabel : label}
        </span>
      </div>
    </motion.a>
  )
}


/* ── Info Block with hover reveal ── */
function InfoReveal({ label, value, hoverText, href, delay = 0, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={href}
      target={href.startsWith('mailto:') || href.startsWith('tel:') ? undefined : '_blank'}
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="block relative overflow-hidden group cursor-pointer rounded-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover bg bar */}
      <div
        className="absolute inset-0 z-0 rounded-lg"
        style={{
          background: 'linear-gradient(90deg, #FF3131, #FF6B35)',
          transform: hovered ? 'translateX(0)' : 'translateX(-101%)',
          transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />

      <div className="relative z-10 px-4 py-3 rounded-lg">
        {/* Label / Hover text */}
        <div
          className="font-mono text-[11px] tracking-wider mb-1"
          style={{
            color: hovered ? '#0a0a0a' : 'rgba(255,255,255,0.25)',
            transition: 'color 0.4s ease',
          }}
        >
          {hovered ? hoverText : label}
        </div>

        {/* Value */}
        <div
          className="font-body text-sm"
          style={{
            color: hovered ? '#0a0a0a' : 'rgba(255,255,255,0.55)',
            transition: 'color 0.4s ease',
          }}
        >
          {value}
        </div>
      </div>
    </motion.a>
  )
}


/* ── Social Links Data ── */
const socialLinks = [
  {
    label: 'Github',
    hoverLabel: 'Backup here\u{1FAE3}',
    href: 'https://github.com/SAURAV-GGD',
  },
  {
    label: 'Instagram',
    hoverLabel: 'mostly spot me here',
    href: 'https://www.instagram.com/_sxurv_/',
  },
  {
    label: 'Linkedin',
    hoverLabel: 'Hire me \u{1F911}',
    href: 'https://www.linkedin.com/in/saurav-kumar-608b2b2a5',
  },
]

/* ════════════════════════════════════════════
   CONTACT SECTION — minhpham inspired
   ════════════════════════════════════════════ */
export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="relative py-28 px-6 md:px-16 bg-void-2 overflow-hidden">
      <div className="absolute inset-x-0 top-0 divider-red" />

      {/* bg glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(ellipse, #FF313118 0%, transparent 70%)' }} />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[11px] tracking-[6px] text-white/20 uppercase mb-16"
        >
          CONNECT
        </motion.div>

        {/* Main grid: Social links + Contact info */}
        <div className="grid md:grid-cols-[1fr_1fr_auto] gap-12 md:gap-8 items-start">

          {/* Column 1 — Social links */}
          <div className="flex flex-col gap-2">
            {socialLinks.slice(0, 2).map((s, i) => (
              <RevealLink
                key={s.label}
                label={s.label}
                hoverLabel={s.hoverLabel}
                href={s.href}
                delay={0.1 + i * 0.08}
                inView={inView}
              />
            ))}
          </div>

          {/* Column 2 — More social links */}
          <div className="flex flex-col gap-2">
            {socialLinks.slice(2).map((s, i) => (
              <RevealLink
                key={s.label}
                label={s.label}
                hoverLabel={s.hoverLabel}
                href={s.href}
                delay={0.25 + i * 0.08}
                inView={inView}
              />
            ))}
          </div>

          {/* Column 3 — Email + Phone with hover reveals */}
          <div className="flex flex-col gap-4 min-w-[240px]">
            <InfoReveal
              label="Email"
              value="sauravggd@gmail.com"
              hoverText="100% chance I read it"
              href="mailto:sauravggd@gmail.com"
              delay={0.3}
              inView={inView}
            />
            <InfoReveal
              label="Phone"
              value="+91 7004239911"
              hoverText="90% chance i don't pickup"
              href="tel:+917004239911"
              delay={0.4}
              inView={inView}
            />
          </div>
        </div>

        {/* Bottom divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-20 h-[1px] origin-left"
          style={{ background: 'linear-gradient(90deg, rgba(255,49,49,0.2), transparent)' }}
        />

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex justify-between items-center"
        >
          <span className="font-mono text-[10px] text-white/15 tracking-[3px]">
            SAURAV_KUMAR · JAIPUR, INDIA
          </span>
          <span className="font-mono text-[10px] text-white/15 tracking-[3px]">
            © {new Date().getFullYear()} · ALL RIGHTS RESERVED
          </span>
        </motion.div>
      </div>
    </section>
  )
}
