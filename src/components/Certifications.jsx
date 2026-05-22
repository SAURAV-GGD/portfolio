import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { certifications } from '../data/index.js'
import TiltCard from './TiltCard.jsx'

const smCertColors = ['#FF3131', '#FFD700', '#FF6B35', '#9B59B6', '#FF3131', '#FFD700', '#FF6B35', '#9B59B6']

function SectionHeader({ num, title }) {
  return (
    <div className="flex items-center gap-5 mb-14">
      <span className="font-mono text-xs text-sm-red/40 tracking-[4px]">{num}</span>
      <h2 className="font-display text-3xl md:text-4xl text-white tracking-[3px] uppercase">{title}</h2>
      <div className="flex-1 h-[2px] bg-gradient-to-r from-sm-red/20 to-transparent" />
    </div>
  )
}

export default function Certifications() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="certs" className="relative py-28 px-6 md:px-16 bg-void-2">
      <div className="absolute inset-x-0 top-0 divider-red" />
      <div className="absolute inset-x-0 bottom-0 divider-red" />

      <div ref={ref} className="max-w-6xl mx-auto">
        <SectionHeader num="04" title="CERTIFICATIONS" />

        <p className="font-mono text-sm text-white/25 -mt-8 mb-12 tracking-[2px]">
          » {certifications.length} credentials from Google Cloud, AWS, Deloitte, JPMorgan & more
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {certifications.map((c, i) => {
            const accent = smCertColors[i % smCertColors.length]
            return (
              <TiltCard
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative group street-card rounded-xl p-5 flex flex-col gap-3 overflow-hidden"
                style={{ border: `1px solid ${accent}12` }}
              >
                {/* left accent bar */}
                <div
                  className="absolute top-0 left-0 w-[3px] h-full opacity-50"
                  style={{ background: `linear-gradient(to bottom, ${accent}, transparent)` }}
                />

                {/* badge + date */}
                <div className="flex items-center justify-between">
                  <div
                    className="font-mono font-bold text-[11px] px-2.5 py-1 rounded tracking-wider"
                    style={{
                      background: `${accent}12`,
                      color: accent,
                      border: `1px solid ${accent}25`,
                      textShadow: `0 0 10px ${accent}60`,
                    }}
                  >
                    {c.badge}
                  </div>
                  <span className="font-mono text-[9px] text-white/20 tracking-[2px]">{c.date}</span>
                </div>

                {/* title */}
                <h3 className="font-display text-sm text-white leading-snug tracking-wider">{c.title}</h3>

                {/* issuer */}
                <div>
                  <div className="font-mono text-[11px] tracking-[2px]" style={{ color: accent }}>{c.issuer}</div>
                  <div className="font-mono text-[9px] text-white/20 tracking-[2px] mt-0.5">via {c.via}</div>
                </div>

                {/* skill pills */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                  {c.tasks.map(t => (
                    <span
                      key={t}
                      className="font-mono text-[9px] px-2 py-0.5 rounded text-white/35"
                      style={{
                        background: `${accent}08`,
                        border: `1px solid ${accent}15`,
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
                    background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accent}08 0%, transparent 70%)`,
                  }}
                />
              </TiltCard>
            )
          })}
        </div>

        {/* issuer logos row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          {['Google Cloud', 'AWS · Forage', 'Deloitte · Forage', 'JPMorgan · Forage', 'Oracle', 'Intern Certify'].map(org => (
            <div key={org} className="font-mono text-[10px] text-white/15 tracking-[3px] border border-white/6 px-4 py-2 rounded-full hover:text-white/35 hover:border-sm-red/20 transition-all duration-300">
              {org}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
