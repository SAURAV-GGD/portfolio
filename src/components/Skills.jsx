import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { skills } from '../data/index.js'

/* ──────────── Category colors ──────────── */
const groupColors = {
  'AI & Machine Learning': '#FF3131',
  'Web & Frontend':        '#FFD700',
  'Cloud & DevOps':        '#FF6B35',
  'Automation & Tools':    '#9B59B6',
  'Data & Analytics':      '#00d4ff',
  'Low-Level & Backend':   '#c8ff57',
  'Blockchain & Web3':     '#ff2d78',
}

/* ──────────── Description for each category ──────────── */
const groupDescriptions = {
  'AI & Machine Learning':
    'Building real-time AI systems with computer vision, gesture recognition, and generative AI. From MediaPipe hand tracking to Gemini-powered apps.',
  'Web & Frontend':
    'Crafting modern, responsive interfaces with React and Tailwind. Shipping production-ready UIs at speed with Vite.',
  'Cloud & DevOps':
    'Certified across Google Cloud & AWS. Designing scalable architectures and deploying ML models on Vertex AI.',
  'Automation & Tools':
    'Automating repetitive workflows with Selenium and Python. From WhatsApp bots to browser-based automation at scale.',
  'Data & Analytics':
    'Crunching data with Pandas and SQL. Turning raw datasets into actionable business insights with clean visualizations.',
  'Low-Level & Backend':
    'Strong fundamentals in C++ and Java. Building backend services with Spring Framework and Apache Kafka.',
  'Blockchain & Web3':
    'Exploring decentralized systems and smart contracts. Built a blockchain-based file sharing prototype.',
}

/* ═══════════════════════════════════════════════════
   SKILL ROW — minhpham-style interactive row
   ═══════════════════════════════════════════════════ */
function SkillRow({ group, tags, color, description, index, visible }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="skill-row group relative"
      initial={{ opacity: 0, x: -60 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover background fill */}
      <motion.div
        className="absolute inset-0 z-0 rounded-lg"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: color,
          transformOrigin: 'left center',
          opacity: 0.95,
        }}
      />

      {/* Main row content */}
      <div className="relative z-10 flex items-center justify-between py-5 md:py-6 px-4 md:px-8">
        {/* Left: Category name in large display font */}
        <div className="flex items-center gap-4">
          <span
            className="font-mono text-[10px] tracking-[3px] transition-colors duration-300"
            style={{ color: hovered ? '#0a0a0a' : `${color}60` }}
          >
            0{index + 1}
          </span>
          <h3
            className="font-display text-3xl md:text-5xl lg:text-6xl tracking-[2px] uppercase transition-all duration-300"
            style={{
              color: hovered ? '#0a0a0a' : '#ffffff18',
              textShadow: hovered ? 'none' : `0 0 0px transparent`,
            }}
          >
            {group.split(' & ')[0]}
          </h3>
        </div>

        {/* Right: Description & tags — revealed on hover */}
        <motion.div
          className="hidden md:block max-w-sm text-right overflow-hidden"
          initial={{ opacity: 0, x: 30 }}
          animate={{
            opacity: hovered ? 1 : 0,
            x: hovered ? 0 : 30,
          }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p
            className="text-sm leading-relaxed font-body mb-2"
            style={{ color: hovered ? '#0a0a0a' : 'transparent' }}
          >
            {description}
          </p>
        </motion.div>
      </div>

      {/* Bottom: Skill tags — slide in on hover */}
      <motion.div
        animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0, y: hovered ? 0 : -10 }}
        className="relative z-10 flex flex-wrap gap-2 px-4 md:px-8 overflow-hidden"
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="pb-5 flex flex-wrap gap-2">
          {tags.map((tag, ti) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8, y: 8 }}
              animate={hovered ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: hovered ? ti * 0.03 : 0, duration: 0.2 }}
              className="font-mono text-[10px] md:text-[11px] px-3 py-1.5 rounded-full tracking-[1px] font-medium"
              style={{
                background: 'rgba(10,10,10,0.25)',
                color: '#0a0a0a',
                border: '1px solid rgba(10,10,10,0.2)',
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Separator line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}25, transparent)`,
          opacity: hovered ? 0 : 1,
        }}
      />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════
   MAIN SKILLS SECTION (WHAT I DO)
   ═══════════════════════════════════════════════════ */
export default function Skills() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.12 })

  return (
    <section
      id="skills"
      className="relative py-28 px-6 md:px-16 bg-void-2"
      ref={sectionRef}
    >
      <div className="absolute inset-x-0 top-0 divider-red" />
      <div className="absolute inset-x-0 bottom-0 divider-red" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-5 mb-6"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="font-mono text-xs text-sm-red/40 tracking-[4px]">
            03
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-white tracking-[3px] uppercase">
            WHAT I DO
          </h2>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-sm-red/20 to-transparent" />
        </motion.div>

        {/* Subheading */}
        <motion.p
          className="font-mono text-[11px] text-white/20 tracking-[3px] mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          » HOVER TO EXPLORE EACH DOMAIN
        </motion.p>

        {/* ── Skill Rows — minhpham style ── */}
        <div className="space-y-0">
          {Object.entries(skills).map(([group, tags], i) => (
            <SkillRow
              key={group}
              group={group}
              tags={tags}
              color={groupColors[group] || '#FF3131'}
              description={groupDescriptions[group] || ''}
              index={i}
              visible={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
