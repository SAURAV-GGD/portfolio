import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { experience } from '../data/index.js'

const smExpColors = ['#FF3131', '#FFD700', '#FF6B35', '#9B59B6', '#FF3131']

function SectionHeader({ num, title }) {
  return (
    <div className="flex items-center gap-5 mb-14">
      <span className="font-mono text-xs text-sm-red/40 tracking-[4px]">{num}</span>
      <h2 className="font-display text-3xl md:text-4xl text-white tracking-[3px] uppercase">{title}</h2>
      <div className="flex-1 h-[2px] bg-gradient-to-r from-sm-red/20 to-transparent" />
    </div>
  )
}

export default function Experience() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="exp" className="relative py-28 px-6 md:px-16">
      <div ref={ref} className="max-w-4xl mx-auto">
        <SectionHeader num="05" title="EXPERIENCE" />

        <div className="relative">
          {/* timeline spine */}
          <div
            className="absolute left-0 top-2 bottom-2 w-[2px]"
            style={{
              background: 'linear-gradient(to bottom, #FF3131, #FFD700, #9B59B6, transparent)',
            }}
          />

          <div className="flex flex-col gap-12 pl-10">
            {experience.map((e, i) => {
              const accent = smExpColors[i % smExpColors.length]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -28 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative group"
                >
                  {/* dot on spine */}
                  <div
                    className="absolute -left-[46px] top-1.5 w-4 h-4 rounded-full border-[3px] border-void"
                    style={{
                      background: accent,
                      boxShadow: `0 0 15px ${accent}80`,
                    }}
                  />

                  {/* card */}
                  <div
                    className="street-card rounded-xl p-6"
                    style={{ border: `1px solid ${accent}12` }}
                  >
                    {/* date */}
                    <div
                      className="font-mono text-[11px] tracking-[3px] mb-2"
                      style={{ color: accent }}
                    >
                      {e.date}
                    </div>

                    {/* role & company */}
                    <h3 className="font-display text-lg text-white tracking-wider">{e.role}</h3>
                    <div className="font-mono text-sm text-white/35 mb-4">{e.company}</div>

                    {/* points */}
                    <ul className="space-y-2.5">
                      {e.points.map((pt, j) => (
                        <li key={j} className="flex items-start gap-3 font-body text-sm text-white/50">
                          <span className="mt-0.5 flex-shrink-0 text-base" style={{ color: accent }}>›</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
