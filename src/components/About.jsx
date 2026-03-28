import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function SectionHeader({ num, title }) {
  return (
    <div className="flex items-center gap-4 mb-14">
      <span className="font-mono text-xs text-neon-lime/50 tracking-[3px]">{num}</span>
      <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-neon-lime/20 to-transparent" />
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
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-28 px-8 md:px-16">
      <div ref={ref} className="max-w-6xl mx-auto">
        <SectionHeader num="// 01" title="about_me" />

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* bio */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block font-mono text-xs px-3 py-1 rounded-sm border border-neon-lime/20 text-neon-lime/70 tracking-widest mb-6">
              B.TECH CSE · ARYA COLLEGE · JAIPUR
            </div>

            <p className="text-white/70 font-body text-base leading-relaxed mb-5">
              Hey! I'm <strong className="text-white">Saurav</strong> — a Computer Science student, vibe coder, and AI builder. I don't just write code from scratch; I orchestrate AI tools to ship real, working products at insane speed.
            </p>
            <p className="text-white/60 font-body text-base leading-relaxed mb-5">
              From computer vision tools to blockchain demos to hyperlocal delivery apps — I build things that <em className="text-neon-lime not-italic">actually work</em>. My edge is using AI-assisted development to go from idea to prototype in hours, not weeks.
            </p>
            <p className="text-white/60 font-body text-base leading-relaxed">
              Certified by Google Cloud, AWS, Deloitte, JPMorgan & Oracle. Still in college. Still shipping. 🔥
            </p>

            {/* traits */}
            <div className="flex flex-wrap gap-2 mt-8">
              {traits.map(t => (
                <div
                  key={t.label}
                  className="glass flex items-center gap-2 px-3 py-1.5 rounded font-mono text-xs text-white/60 hover:text-neon-lime hover:border-neon-lime/30 transition-colors"
                >
                  <span>{t.icon}</span> {t.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* github stats */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <img
              src="https://github-readme-stats.vercel.app/api?username=Godgiftedevil&show_icons=true&hide_border=true&bg_color=06060a&title_color=c8ff57&icon_color=bf7aff&text_color=a0aec0&ring_color=c8ff57"
              alt="GitHub Stats"
              className="rounded-lg w-full"
              style={{ border: '1px solid rgba(200,255,87,0.12)', boxShadow: '0 0 24px rgba(200,255,87,0.07)' }}
            />
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=Godgiftedevil&hide_border=true&background=06060a&ring=c8ff57&fire=ff2d78&currStreakLabel=bf7aff&sideNums=a0aec0&sideLabels=606880&dates=606880"
              alt="GitHub Streak"
              className="rounded-lg w-full"
              style={{ border: '1px solid rgba(200,255,87,0.12)', boxShadow: '0 0 24px rgba(200,255,87,0.07)' }}
            />
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=Godgiftedevil&layout=compact&hide_border=true&bg_color=06060a&title_color=c8ff57&text_color=a0aec0"
              alt="Top Languages"
              className="rounded-lg w-full"
              style={{ border: '1px solid rgba(200,255,87,0.12)', boxShadow: '0 0 24px rgba(200,255,87,0.07)' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
