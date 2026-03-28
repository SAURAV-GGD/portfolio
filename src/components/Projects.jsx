import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '../data/index.js'

const smAccents = ['#FF3131', '#FFD700', '#FF6B35', '#9B59B6']

function SectionHeader({ num, title }) {
  return (
    <div className="flex items-center gap-5 mb-14">
      <span className="font-mono text-xs text-sm-red/40 tracking-[4px]">{num}</span>
      <h2 className="font-display text-3xl md:text-4xl text-white tracking-[3px] uppercase">{title}</h2>
      <div className="flex-1 h-[2px] bg-gradient-to-r from-sm-red/20 to-transparent" />
    </div>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export default function Projects() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="relative py-28 px-6 md:px-16">
      <div ref={ref} className="max-w-6xl mx-auto">
        <SectionHeader num="03" title="PROJECTS" />

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => {
            const accent = smAccents[i % smAccents.length]
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative street-card rounded-2xl p-7 overflow-hidden"
                style={{ border: `1px solid ${accent}15` }}
              >
                {/* top glow line on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />

                {/* featured badge */}
                {p.featured && (
                  <div
                    className="absolute top-4 right-4 font-mono text-[9px] px-2.5 py-1 rounded tracking-[3px]"
                    style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}
                  >
                    FEATURED
                  </div>
                )}

                <div className="font-mono text-[10px] tracking-[4px] text-white/15 mb-3">PROJECT_{p.id}</div>

                <h3 className="font-display text-xl md:text-2xl text-white mb-3 tracking-wider group-hover:sm-red transition-colors duration-300">
                  {p.name}
                </h3>

                <p className="font-body text-sm text-white/45 leading-relaxed mb-5">{p.desc}</p>

                {/* tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2.5 py-0.5 rounded tracking-wider"
                      style={{
                        color: accent,
                        background: `${accent}0d`,
                        border: `1px solid ${accent}20`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* github link */}
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-white/35 hover:text-sm-red transition-colors duration-200"
                >
                  <GithubIcon /> VIEW ON GITHUB ↗
                </a>
              </motion.div>
            )
          })}
        </div>

        {/* view all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Godgiftedevil"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-white/25 hover:text-sm-red transition-colors duration-200 tracking-[3px]"
          >
            VIEW ALL ON GITHUB ↗
          </a>
        </motion.div>
      </div>
    </section>
  )
}
