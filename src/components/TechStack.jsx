import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import { skills } from '../data/index.js'

const groupColors = {
  'AI & Machine Learning': '#FF3131',
  'Web & Frontend':        '#FFD700',
  'Cloud & DevOps':        '#FF6B35',
  'Automation & Tools':    '#9B59B6',
  'Data & Analytics':      '#00d4ff',
  'Low-Level & Backend':   '#c8ff57',
  'Blockchain & Web3':     '#ff2d78',
}

function collectTechs() {
  const result = []
  Object.entries(skills).forEach(([group, tags]) => {
    tags.forEach(tag => {
      // Deduplicate tags
      if (!result.find(r => r.name === tag)) {
        result.push({ name: tag, color: groupColors[group] || '#FF3131' })
      }
    })
  })
  return result
}

export default function TechStack() {
  const [phase, setPhase] = useState('idle')
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })
  const triggered = useRef(false)

  const allTechs = useMemo(() => collectTechs(), [])

  useEffect(() => {
    if (!inView || triggered.current) return
    triggered.current = true

    // Skip heavy animation on mobile for performance
    if (window.innerWidth < 768) {
      setPhase('ring')
      return
    }

    setPhase('blackout')

    const timers = [
      setTimeout(() => setPhase('scanning'), 400),
      setTimeout(() => setPhase('implode'), 1200),
      setTimeout(() => setPhase('flash'), 2500),
      setTimeout(() => setPhase('ring'), 2900), // final state
    ]

    return () => timers.forEach(clearTimeout)
  }, [inView])

  return (
    <section id="tech-stack" ref={sectionRef} className="relative py-20 px-6 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-void">
      
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 noise-bg opacity-40 pointer-events-none" />

      {/* ── SECTION HEADER ── */}
      <motion.div 
        className="absolute top-28 left-6 md:left-16 z-[10]"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'ring' ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex items-center gap-5">
          <span className="font-mono text-xs text-sm-red/40 tracking-[4px]">02</span>
          <h2 className="font-display text-3xl md:text-4xl text-white tracking-[3px] uppercase">
            TECH I USED
          </h2>
          <div className="w-24 md:w-32 h-[2px] bg-gradient-to-r from-sm-red/20 to-transparent" />
        </div>
      </motion.div>


      {/* ── ANIMATION OVERLAY ── */}
      <AnimatePresence>
        {phase !== 'idle' && phase !== 'ring' && (
          <motion.div
            key="nuke-blackout"
            className="fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'flash' ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: phase === 'flash' ? 0.3 : 0.4 }}
          >
            {/* Scanlines on top of blackout */}
            <div className="absolute inset-0 crt-scanlines pointer-events-none opacity-50" />

            {/* Phase: SCANNING */}
            {phase === 'scanning' && (
              <motion.div
                className="flex flex-col items-center gap-5 relative z-10"
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="scan-line-anim w-64 h-[2px] bg-sm-red opacity-50" />
                <span className="font-mono text-sm tracking-[10px] text-sm-red neon-pulse-text font-bold">
                  WARNING: SYSTEM OVERRIDE
                </span>
                <div className="scan-line-anim w-64 h-[2px] bg-sm-red opacity-50" />
              </motion.div>
            )}

            {/* Phase: IMPLODE (Energy gathering) */}
            {phase === 'implode' && (
              <motion.div className="absolute w-full h-full inset-0 overflow-hidden pointer-events-none">
                  {/* Particles flying into center */}
                  {Array.from({length: 80}).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-sm-red rounded-full"
                      style={{ boxShadow: '0 0 15px #ff3131, 0 0 30px #ff3131' }}
                      initial={{ 
                        left: `${Math.random()*100}%`, 
                        top: `${Math.random()*100}%`, 
                        scale: Math.random() * 2 + 1 
                      }}
                      animate={{ left: '50%', top: '50%', scale: 0 }}
                      transition={{ 
                        duration: 0.8 + Math.random() * 0.5, 
                        ease: "anticipate"
                      }}
                    />
                  ))}
                  
                  {/* Core gathering energy */}
                  <motion.div 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
                    initial={{ width: 0, height: 0, background: 'rgba(255,49,49,0.8)' }}
                    animate={{ width: 200, height: 200, background: 'rgba(255,255,255,1)' }}
                    transition={{ duration: 1.3, ease: 'easeIn' }}
                    style={{ filter: 'blur(20px)' }}
                  />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── THE NUCLEAR FLASH FULL SCREEN BLAST (only for split second) ── */}
      <AnimatePresence>
        {phase === 'flash' && (
           <motion.div 
              className="fixed inset-0 z-[9999] bg-white pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
           />
        )}
      </AnimatePresence>


      {/* ── RING PHASE: MUSHROOM CLOUD CRATER & ORBITING 3D PIXELATED ICONS ── */}
      <motion.div 
        className="relative z-[5] w-full flex-grow flex items-center justify-center mt-20 md:mt-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: phase === 'ring' ? 1 : 0, scale: phase === 'ring' ? 1 : 0.5 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // spring-like burst
      >
        {/* The glowing "blast crater" / mushroom cloud aura */}
        <div className="absolute w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none"
             style={{
               background: 'radial-gradient(circle, rgba(255,49,49,0.25) 0%, rgba(255,107,53,0.1) 40%, transparent 70%)',
               filter: 'blur(40px)',
               animation: 'pulse 4s infinite alternate'
             }}
        />
        
        <div className="absolute w-[100px] h-[100px] md:w-[200px] md:h-[200px] rounded-full pointer-events-none"
             style={{
               background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,49,49,0.5) 40%, transparent 80%)',
               filter: 'blur(25px)',
             }}
        />
        
        <div className="absolute text-center select-none pointer-events-none">
           <span className="font-display text-4xl md:text-6xl text-white/5 tracking-[10px] drop-shadow-2xl">CORE</span>
        </div>

        {/* Orbiting Tech Icons */}
        <div className="relative w-full max-w-[800px] h-[350px] md:h-[600px] flex items-center justify-center pointer-events-none">
          
          <motion.div 
             className="w-full h-full relative"
             animate={{ rotate: 360 }}
             transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
             {allTechs.map((tech, i) => {
               const total = allTechs.length;
               const angle = (i / total) * 360;
               // Stagger radius so they form a thick belt, some closer, some further
               const radiusBase = window.innerWidth < 768 ? 130 : 250;
               const radiusVariation = (i % 3) * 30; // 0, 30, 60
               const radius = radiusBase + radiusVariation;

               const x = Math.cos(angle * Math.PI / 180) * radius;
               const y = Math.sin(angle * Math.PI / 180) * radius;

               return (
                 <div
                   key={tech.name}
                   className="absolute left-1/2 top-1/2 pointer-events-auto"
                   style={{
                     transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                   }}
                 >
                   {/* Counter-rotate to keep text upright */}
                   <motion.div
                     animate={{ rotate: -360 }}
                     transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                     className="relative group cursor-crosshair"
                   >
                      <div className="flex flex-col items-center justify-center p-2 transition-transform duration-300 hover:scale-125 hover:z-50">
                         {/* 3D Pixelated Box Look via pure CSS */}
                         <div 
                           className="font-mono text-[10px] md:text-sm font-bold tracking-widest px-3 py-2 bg-void border border-white/5"
                           style={{
                             color: tech.color,
                             textShadow: `1px 1px 0px #000, 2px 2px 0px #000, 0 0 10px ${tech.color}80`,
                             // simulate thick 3D bevel bottom right
                             boxShadow: `inset 0 0 8px ${tech.color}20, 2px 2px 0 #000, 4px 4px 0 ${tech.color}40, 0 0 20px ${tech.color}20`,
                             backdropFilter: 'blur(5px)',
                             whiteSpace: 'nowrap'
                           }}
                         >
                           {tech.name}
                         </div>
                      </div>
                   </motion.div>
                 </div>
               );
             })}
          </motion.div>
        </div>

      </motion.div>
    </section>
  )
}
