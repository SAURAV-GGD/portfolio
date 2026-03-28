import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { certifications } from '../data/index.js'

function SectionHeader({ num, title }) {
  return (
    <div className="flex items-center gap-4 mb-14">
      <span className="font-mono text-xs text-neon-lime/50 tracking-[3px]">{num}</span>
      <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-neon-lime/20 to-transparent" />
    </div>
  )
}

export default function Certifications() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="certs" className="relative py-28 px-8 md:px-16 bg-void-2">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-lime/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-lime/15 to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto">
        <SectionHeader num="// 04" title="certifications_&_licenses" />

        <p className="font-mono text-sm text-white/30 -mt-8 mb-12 tracking-wider">
          // {certifications.length} credentials from Google Cloud, AWS, Deloitte, JPMorgan & more
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {certifications.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="relative glass rounded-xl p-5 flex flex-col gap-3 overflow-hidden group"
              style={{
                border: `1px solid ${c.accent}20`,
                transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${c.accent}55`
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)'
                e.currentTarget.style.boxShadow = `0 16px 40px ${c.accent}12`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${c.accent}20`
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* left accent bar */}
              <div
                className="absolute top-0 left-0 w-0.5 h-full opacity-60"
                style={{ background: `linear-gradient(to bottom, ${c.accent}, transparent)` }}
              />

              {/* badge + date row */}
              <div className="flex items-center justify-between">
                <div
                  className="font-mono font-bold text-xs px-2 py-1 rounded"
                  style={{
                    background: `${c.accent}18`,
                    color: c.accent,
                    border: `1px solid ${c.accent}35`,
                    textShadow: `0 0 8px ${c.accent}80`,
                  }}
                >
                  {c.badge}
                </div>
                <span className="font-mono text-[10px] text-white/25 tracking-widest">{c.date}</span>
              </div>

              {/* title */}
              <h3 className="font-display font-bold text-sm text-white leading-snug">{c.title}</h3>

              {/* issuer */}
              <div>
                <div className="font-mono text-[11px] tracking-wider" style={{ color: c.accent }}>{c.issuer}</div>
                <div className="font-mono text-[10px] text-white/25 tracking-widest mt-0.5">via {c.via}</div>
              </div>

              {/* skill pills */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {c.tasks.map(t => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-0.5 rounded-sm text-white/40"
                    style={{
                      background: `${c.accent}0d`,
                      border: `1px solid ${c.accent}20`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* hover shimmer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${c.accent}08 0%, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* issuer logos row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
        >
          {['Google Cloud', 'AWS · Forage', 'Deloitte · Forage', 'JPMorgan · Forage', 'Oracle', 'Intern Certify'].map(org => (
            <div key={org} className="font-mono text-xs text-white/20 tracking-widest border border-white/8 px-4 py-2 rounded-full hover:text-white/40 hover:border-white/15 transition-colors">
              {org}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
