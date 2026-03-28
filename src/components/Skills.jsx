import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skills } from '../data/index.js'

const groupColors = {
  'AI & Machine Learning': '#FF3131',
  'Web & Frontend':        '#FFD700',
  'Cloud & DevOps':        '#FF6B35',
  'Automation & Tools':    '#9B59B6',
  'Data & Analytics':      '#F0F0F0',
  'Low-Level & Backend':   '#FF3131',
  'Blockchain & Web3':     '#FFD700',
}

function SectionHeader({ num, title }) {
  return (
    <div className="flex items-center gap-5 mb-14">
      <span className="font-mono text-xs text-sm-red/40 tracking-[4px]">{num}</span>
      <h2 className="font-display text-3xl md:text-4xl text-white tracking-[3px] uppercase">{title}</h2>
      <div className="flex-1 h-[2px] bg-gradient-to-r from-sm-red/20 to-transparent" />
    </div>
  )
}

export default function Skills() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative py-28 px-6 md:px-16 bg-void-2">
      {/* dividers */}
      <div className="absolute inset-x-0 top-0 divider-red" />
      <div className="absolute inset-x-0 bottom-0 divider-red" />

      <div ref={ref} className="max-w-6xl mx-auto">
        <SectionHeader num="02" title="SKILLS" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skills).map(([group, tags], gi) => {
            const color = groupColors[group] || '#FF3131'
            return (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: gi * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="street-card rounded-xl p-6"
                style={{
                  border: `1px solid ${color}15`,
                }}
              >
                {/* group header */}
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-1.5 h-5 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
                  <span
                    className="font-mono text-[10px] tracking-[3px] uppercase font-medium"
                    style={{ color }}
                  >
                    {group}
                  </span>
                </div>

                {/* tags */}
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] px-2.5 py-1 rounded text-white/55 hover:text-white transition-all duration-200 hover:translate-y-[-1px]"
                      style={{
                        background: `${color}0a`,
                        border: `1px solid ${color}18`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
