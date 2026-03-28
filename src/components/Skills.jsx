import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skills } from '../data/index.js'

const groupColors = {
  'AI & Machine Learning': '#c8ff57',
  'Web & Frontend':        '#00d4ff',
  'Cloud & DevOps':        '#34a853',
  'Automation & Tools':    '#bf7aff',
  'Data & Analytics':      '#ffe033',
  'Low-Level & Backend':   '#ff9500',
  'Blockchain & Web3':     '#ff2d78',
}

function SectionHeader({ num, title }) {
  return (
    <div className="flex items-center gap-4 mb-14">
      <span className="font-mono text-xs text-neon-lime/50 tracking-[3px]">{num}</span>
      <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-neon-lime/20 to-transparent" />
    </div>
  )
}

export default function Skills() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative py-28 px-8 md:px-16 bg-void-2">
      {/* subtle divider lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-lime/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-lime/15 to-transparent" />

      <div ref={ref} className="max-w-6xl mx-auto">
        <SectionHeader num="// 02" title="skills" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skills).map(([group, tags], gi) => {
            const color = groupColors[group] || '#c8ff57'
            return (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: gi * 0.07 }}
                className="glass rounded-xl p-6 group hover:scale-[1.02] transition-transform"
                style={{
                  border: `1px solid ${color}20`,
                  boxShadow: `0 0 0px ${color}00`,
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 24px ${color}18`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0px ${color}00`}
              >
                {/* group header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-4 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                  <span
                    className="font-mono text-[11px] tracking-[2px] uppercase"
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
                      className="font-mono text-[11px] px-2.5 py-1 rounded-sm text-white/60 hover:text-white transition-colors"
                      style={{
                        background: `${color}0d`,
                        border: `1px solid ${color}25`,
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
