import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function SectionHeader({ num, title }) {
  return (
    <div className="flex items-center gap-5 mb-14">
      <span className="font-mono text-xs text-sm-red/40 tracking-[4px]">{num}</span>
      <h2 className="font-display text-3xl md:text-4xl text-white tracking-[3px] uppercase">{title}</h2>
      <div className="flex-1 h-[2px] bg-gradient-to-r from-sm-red/20 to-transparent" />
    </div>
  )
}

const socials = [
  {
    label: 'GITHUB',
    handle: '@Godgiftedevil',
    href: 'https://github.com/Godgiftedevil',
    accent: '#FF3131',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LINKEDIN',
    handle: 'Saurav Kumar',
    href: 'https://www.linkedin.com/in/saurav-kumar-608b2b2a5',
    accent: '#FFD700',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'EMAIL',
    handle: 'sauravkumar@mail.com',
    href: 'mailto:sauravkumar@mail.com',
    accent: '#FF6B35',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
]

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

      <div ref={ref} className="max-w-3xl mx-auto text-center relative z-10">
        <SectionHeader num="06" title="CONTACT" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h3 className="font-display text-4xl md:text-5xl text-white mb-5 tracking-wider">
            LET'S BUILD SOMETHING
            <span className="sm-red"> REAL.</span>
          </h3>
          <p className="font-body text-white/40 text-base leading-relaxed max-w-lg mx-auto mb-12">
            Open to internships, collabs, AI projects, or just a good tech conversation.
            Drop me a message — I reply fast. ⚡
          </p>

          {/* main CTA */}
          <a
            href="mailto:sauravkumar@mail.com"
            className="inline-flex items-center gap-3 px-9 py-4 bg-sm-red text-white font-display text-base tracking-[3px] rounded-lg hover:bg-sm-gold hover:text-void transition-all duration-300 hover:scale-105 mb-12"
            style={{ boxShadow: '0 0 40px #FF313130' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 7l10 7 10-7" />
            </svg>
            SEND MESSAGE
          </a>

          {/* socials */}
          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="street-card flex items-center gap-3 px-5 py-3 rounded-xl font-mono text-sm"
                style={{
                  border: `1px solid ${s.accent}15`,
                  color: 'rgba(255,255,255,0.4)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = s.accent
                  e.currentTarget.style.borderColor = `${s.accent}40`
                  e.currentTarget.style.boxShadow = `0 0 25px ${s.accent}15`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                  e.currentTarget.style.borderColor = `${s.accent}15`
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {s.icon}
                <div className="text-left">
                  <div className="text-[9px] tracking-[3px] text-white/20">{s.label}</div>
                  <div className="text-xs">{s.handle}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
