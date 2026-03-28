import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { experience } from '../data/index.js'

function SectionHeader({ num, title }) {
  return (
    <div className="flex items-center gap-4 mb-14">
      <span className="font-mono text-xs text-neon-lime/50 tracking-[3px]">{num}</span>
      <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-neon-lime/20 to-transparent" />
    </div>
  )
}

export default function Experience() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="exp" className="relative py-28 px-8 md:px-16">
      <div ref={ref} className="max-w-4xl mx-auto">
        <SectionHeader num="// 05" title="experience" />

        <div className="relative">
          {/* timeline spine */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px"
            style={{
              background: 'linear-gradient(to bottom, #c8ff57, #bf7aff, #ff2d78, transparent)',
            }}
          />

          <div className="flex flex-col gap-12 pl-10">
            {experience.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -28 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative group"
              >
                {/* dot on spine */}
                <div
                  className="absolute -left-[46px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-void"
                  style={{
                    background: e.accent,
                    boxShadow: `0 0 12px ${e.accent}80`,
                  }}
                />

                {/* card */}
                <div
                  className="glass rounded-xl p-6 transition-all duration-300"
                  style={{
                    border: `1px solid ${e.accent}18`,
                  }}
                  onMouseEnter={el => {
                    el.currentTarget.style.borderColor = `${e.accent}45`
                    el.currentTarget.style.boxShadow = `0 8px 32px ${e.accent}10`
                  }}
                  onMouseLeave={el => {
                    el.currentTarget.style.borderColor = `${e.accent}18`
                    el.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* date */}
                  <div
                    className="font-mono text-[11px] tracking-[2px] mb-2"
                    style={{ color: e.accent }}
                  >
                    {e.date}
                  </div>

                  {/* role & company */}
                  <h3 className="font-display font-bold text-lg text-white">{e.role}</h3>
                  <div className="font-mono text-sm text-white/40 mb-4">{e.company}</div>

                  {/* points */}
                  <ul className="space-y-2">
                    {e.points.map((pt, j) => (
                      <li key={j} className="flex items-start gap-3 font-body text-sm text-white/55">
                        <span style={{ color: e.accent, marginTop: '2px', flexShrink: 0 }}>›</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
