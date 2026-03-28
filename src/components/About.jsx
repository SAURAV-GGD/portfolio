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

const traits = [
  { icon: '🧠', label: 'AI-first thinker' },
  { icon: '⚡', label: 'Rapid prototyper' },
  { icon: '🏋️', label: 'Competitive lifter' },
  { icon: '🎓', label: 'CSE student 2027' },
  { icon: '🚀', label: 'Ships fast' },
  { icon: '🤝', label: 'Junior mentor' },
]

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-28 px-6 md:px-16">
      <div ref={ref} className="max-w-6xl mx-auto">
        <SectionHeader num="01" title="ABOUT ME" />

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* bio */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-block font-mono text-[11px] px-4 py-1.5 rounded border border-sm-red/15 text-sm-red/60 tracking-[3px] mb-7">
              B.TECH CSE · ARYA COLLEGE · JAIPUR
            </div>

            <p className="text-white/65 font-body text-base leading-relaxed mb-5">
              Hey! I'm <strong className="text-white">Saurav</strong> — a Computer Science student, vibe coder, and AI builder. I don't just write code from scratch; I orchestrate AI tools to ship real, working products at insane speed.
            </p>
            <p className="text-white/50 font-body text-base leading-relaxed mb-5">
              From computer vision tools to blockchain demos to hyperlocal delivery apps — I build things that <em className="sm-red not-italic font-semibold">actually work</em>. My edge is using AI-assisted development to go from idea to prototype in hours, not weeks.
            </p>
            <p className="text-white/50 font-body text-base leading-relaxed">
              Certified by Google Cloud, AWS, Deloitte, JPMorgan & Oracle. Still in college. Still shipping. 🔥
            </p>

            {/* traits */}
            <div className="flex flex-wrap gap-2 mt-8">
              {traits.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="street-card flex items-center gap-2 px-3 py-1.5 rounded font-mono text-[11px] text-white/50"
                >
                  <span>{t.icon}</span> {t.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* github stats */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-4"
          >
            <img
              src="https://github-readme-stats.vercel.app/api?username=Godgiftedevil&show_icons=true&hide_border=true&bg_color=0a0a0a&title_color=FF3131&icon_color=FFD700&text_color=a0aec0&ring_color=FF3131"
              alt="GitHub Stats"
              className="rounded-lg w-full"
              style={{ border: '1px solid rgba(255,49,49,0.1)', boxShadow: '0 0 30px rgba(255,49,49,0.05)' }}
              loading="lazy"
            />
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=Godgiftedevil&hide_border=true&background=0a0a0a&ring=FF3131&fire=FFD700&currStreakLabel=9B59B6&sideNums=a0aec0&sideLabels=606880&dates=606880"
              alt="GitHub Streak"
              className="rounded-lg w-full"
              style={{ border: '1px solid rgba(255,49,49,0.1)', boxShadow: '0 0 30px rgba(255,49,49,0.05)' }}
              loading="lazy"
            />
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=Godgiftedevil&layout=compact&hide_border=true&bg_color=0a0a0a&title_color=FF3131&text_color=a0aec0"
              alt="Top Languages"
              className="rounded-lg w-full"
              style={{ border: '1px solid rgba(255,49,49,0.1)', boxShadow: '0 0 30px rgba(255,49,49,0.05)' }}
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
