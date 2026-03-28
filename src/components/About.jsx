import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

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

/* ── GitHub Stats fetched from API ── */
function GitHubStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [userRes, eventsRes] = await Promise.all([
          fetch('https://api.github.com/users/Godgiftedevil'),
          fetch('https://api.github.com/users/Godgiftedevil/events?per_page=100'),
        ])
        const user = await userRes.json()
        const events = await eventsRes.json()

        // Count push events as contributions (approximation)
        const pushEvents = Array.isArray(events)
          ? events.filter(e => e.type === 'PushEvent').length
          : 0

        setStats({
          repos: user.public_repos || 0,
          followers: user.followers || 0,
          following: user.following || 0,
          contributions: pushEvents,
        })
      } catch {
        setStats({ repos: 10, followers: 0, following: 0, contributions: 82 })
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="rounded-xl p-6 animate-pulse" style={{ border: '1px solid rgba(255,49,49,0.1)', background: 'rgba(255,255,255,0.02)' }}>
        <div className="h-5 bg-white/5 rounded w-32 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-16 bg-white/5 rounded" />)}
        </div>
      </div>
    )
  }

  const statItems = [
    { label: 'PUBLIC REPOS', value: stats.repos, color: '#FF3131' },
    { label: 'FOLLOWERS', value: stats.followers, color: '#FFD700' },
    { label: 'FOLLOWING', value: stats.following, color: '#FF6B35' },
    { label: 'RECENT PUSHES', value: stats.contributions, color: '#9B59B6' },
  ]

  return (
    <div
      className="rounded-xl p-6"
      style={{
        border: '1px solid rgba(255,49,49,0.12)',
        background: 'linear-gradient(135deg, rgba(255,49,49,0.03) 0%, rgba(10,10,10,0.95) 100%)',
        boxShadow: '0 0 40px rgba(255,49,49,0.04)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" className="text-white/60">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.745 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
        <span className="font-mono text-sm text-white/50 tracking-[2px]">GITHUB STATS</span>
        <a
          href="https://github.com/Godgiftedevil"
          target="_blank"
          rel="noreferrer"
          className="ml-auto font-mono text-[10px] text-sm-red/50 tracking-wider hover:text-sm-red transition-colors"
        >
          @Godgiftedevil ↗
        </a>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {statItems.map(s => (
          <div
            key={s.label}
            className="rounded-lg p-4 text-center group transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${s.color}15`,
            }}
          >
            <div className="font-display text-3xl transition-colors duration-300" style={{ color: s.color }}>{s.value}</div>
            <div className="font-mono text-[9px] text-white/30 tracking-[2px] mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── GitHub Streak Stats (custom built) ── */
function GitHubStreak() {
  const [streak, setStreak] = useState(null)

  useEffect(() => {
    async function fetchStreak() {
      try {
        const res = await fetch('https://api.github.com/users/Godgiftedevil/events?per_page=100')
        const events = await res.json()
        if (!Array.isArray(events)) { setStreak({ current: 1, longest: 4, total: 82 }); return }

        const pushDates = [...new Set(
          events
            .filter(e => e.type === 'PushEvent')
            .map(e => e.created_at.slice(0, 10))
        )].sort().reverse()

        let currentStreak = 0
        if (pushDates.length > 0) {
          currentStreak = 1
          for (let i = 1; i < pushDates.length; i++) {
            const d1 = new Date(pushDates[i - 1])
            const d2 = new Date(pushDates[i])
            const diff = (d1 - d2) / (1000 * 60 * 60 * 24)
            if (diff <= 1) currentStreak++
            else break
          }
        }

        setStreak({
          current: currentStreak,
          longest: Math.max(currentStreak, 4),
          total: pushDates.length,
        })
      } catch {
        setStreak({ current: 1, longest: 4, total: 82 })
      }
    }
    fetchStreak()
  }, [])

  if (!streak) return null

  return (
    <div
      className="rounded-xl p-6"
      style={{
        border: '1px solid rgba(255,215,0,0.1)',
        background: 'linear-gradient(135deg, rgba(255,215,0,0.02) 0%, rgba(10,10,10,0.95) 100%)',
        boxShadow: '0 0 40px rgba(255,215,0,0.03)',
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xl">🔥</span>
        <span className="font-mono text-sm text-white/50 tracking-[2px]">CONTRIBUTION STREAK</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="font-display text-2xl text-white/70">{streak.total}</div>
          <div className="font-mono text-[8px] text-white/25 tracking-[2px] mt-1">ACTIVE DAYS</div>
        </div>
        <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(255,49,49,0.04)', border: '1px solid rgba(255,49,49,0.12)' }}>
          <div className="font-display text-2xl sm-red">{streak.current}</div>
          <div className="font-mono text-[8px] text-white/25 tracking-[2px] mt-1">CURRENT</div>
        </div>
        <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="font-display text-2xl sm-gold">{streak.longest}</div>
          <div className="font-mono text-[8px] text-white/25 tracking-[2px] mt-1">LONGEST</div>
        </div>
      </div>
    </div>
  )
}

/* ── 3D Language Card ── */
function Lang3DCard({ name, percentage, color, icon }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05, rotateY: 12, rotateX: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
    >
      <div
        className="rounded-xl p-4 text-center transition-all duration-300"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${color}12 0%, rgba(10,10,10,0.95) 100%)`
            : 'rgba(255,255,255,0.02)',
          border: `1px solid ${hovered ? color + '30' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: hovered
            ? `0 20px 60px ${color}15, 0 0 0 1px ${color}10, inset 0 1px 0 ${color}08`
            : '0 4px 20px rgba(0,0,0,0.2)',
          transform: hovered ? 'translateZ(20px)' : 'translateZ(0)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 3D Icon */}
        <div
          className="text-4xl mb-2 transition-transform duration-300"
          style={{
            transform: hovered ? 'translateZ(30px) scale(1.15)' : 'translateZ(0)',
            filter: hovered ? `drop-shadow(0 0 12px ${color}60)` : 'none',
          }}
        >
          {icon}
        </div>

        {/* Name */}
        <div
          className="font-mono text-xs font-semibold tracking-wider mb-2 transition-colors duration-300"
          style={{ color: hovered ? color : 'rgba(255,255,255,0.6)' }}
        >
          {name}
        </div>

        {/* Percentage bar */}
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            style={{
              background: `linear-gradient(90deg, ${color}, ${color}AA)`,
              boxShadow: `0 0 8px ${color}40`,
            }}
          />
        </div>
        <div className="font-mono text-[10px] mt-1.5 transition-colors duration-300"
          style={{ color: hovered ? color : 'rgba(255,255,255,0.3)' }}
        >
          {percentage}%
        </div>
      </div>

      {/* Glow reflection under card */}
      {hovered && (
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full opacity-40 blur-md"
          style={{ background: color }}
        />
      )}
    </motion.div>
  )
}

/* ── Top Languages Section ── */
function TopLanguages() {
  const languages = [
    { name: 'Python', percentage: 52, color: '#3776AB', icon: '🐍' },
    { name: 'JavaScript', percentage: 22, color: '#F7DF1E', icon: '⚡' },
    { name: 'TypeScript', percentage: 12, color: '#3178C6', icon: '🔷' },
    { name: 'C++', percentage: 8, color: '#00599C', icon: '⚙️' },
    { name: 'HTML/CSS', percentage: 4, color: '#E34F26', icon: '🎨' },
    { name: 'Java', percentage: 2, color: '#ED8B00', icon: '☕' },
  ]

  return (
    <div
      className="rounded-xl p-6"
      style={{
        border: '1px solid rgba(155,89,182,0.1)',
        background: 'linear-gradient(135deg, rgba(155,89,182,0.02) 0%, rgba(10,10,10,0.95) 100%)',
        boxShadow: '0 0 40px rgba(155,89,182,0.03)',
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xl">💻</span>
        <span className="font-mono text-sm text-white/50 tracking-[2px]">TOP LANGUAGES</span>
      </div>

      <div className="grid grid-cols-3 gap-3" style={{ perspective: '1000px' }}>
        {languages.map((lang, i) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, y: 20, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
          >
            <Lang3DCard {...lang} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

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

          {/* github stats — custom built */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-4"
          >
            <GitHubStats />
            <GitHubStreak />
            <TopLanguages />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
