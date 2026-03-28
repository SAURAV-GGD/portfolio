import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Arch Linux ASCII Art ─── */
const ARCH_LOGO = [
  '                   -`                 ',
  '                  .o+`                ',
  '                 `ooo/                ',
  '                `+oooo:               ',
  '               `+oooooo:              ',
  '               -+oooooo+:             ',
  '             `/:-:++oooo+:            ',
  '            `/++++/+++++++:           ',
  '           `/++++++++++++++:          ',
  '          `/+++ooooooooooooo/`        ',
  '         ./ooosssso++osssssso+`       ',
  '        .oossssso-````/ossssss+`      ',
  '       -osssssso.      :ssssssso.     ',
  '      :osssssss/        osssso+++.    ',
  '     /ossssssss/        +ssssooo/-    ',
  '   `/ossssso+/:-        -:/+osssso+-  ',
  '  `+sso+:-`                 `.-/+oso: ',
  ' `++:.                           `-/+/',
  ' .`                                 `/',
]

/* ─── Boot Messages ─── */
const BOOT_LINES = [
  { text: ':: Booting Saurav Kumar OS v4.2.0-arch1-1 ...', type: 'header', delay: 80 },
  { text: '[  0.000000] Linux version 6.7.4-arch1-1 (gcc 13.2.1)', type: 'kernel', delay: 40 },
  { text: '[  0.000000] Command line: BOOT_IMAGE=/vmlinuz-linux root=UUID=sk-portfolio', type: 'kernel', delay: 30 },
  { text: '[  0.012445] BIOS-provided physical RAM map', type: 'kernel', delay: 25 },
  { text: '[  0.034221] DMI: SAURAV-MACHINE/SK-BOARD, BIOS 2027.03', type: 'kernel', delay: 30 },
  { text: '', type: 'blank', delay: 100 },
  { text: ':: Loading kernel modules...', type: 'systemd', delay: 60 },
  { text: '   [  OK  ] Started systemd-modules-load.service', type: 'ok', delay: 80 },
  { text: '   [  OK  ] Reached target - Local File Systems', type: 'ok', delay: 60 },
  { text: '   [  OK  ] Started systemd-journald.service', type: 'ok', delay: 50 },
  { text: '', type: 'blank', delay: 80 },
  { text: ':: Initializing portfolio subsystems...', type: 'systemd', delay: 70 },
  { text: '   [  OK  ] Loading react@18.2.0', type: 'ok', delay: 55 },
  { text: '   [  OK  ] Loading framer-motion@11.0.0', type: 'ok', delay: 45 },
  { text: '   [  OK  ] Loading tailwindcss@3.4.1', type: 'ok', delay: 50 },
  { text: '   [  OK  ] Compiling JSX components...', type: 'ok', delay: 65 },
  { text: '   [  OK  ] Hydrating DOM tree', type: 'ok', delay: 40 },
  { text: '', type: 'blank', delay: 60 },
  { text: ':: Loading user profile: saurav-kumar...', type: 'systemd', delay: 80 },
  { text: '   → skills.db .......................... loaded', type: 'dots', delay: 50 },
  { text: '   → projects.db ....................... loaded', type: 'dots', delay: 45 },
  { text: '   → certifications.db ................. loaded', type: 'dots', delay: 40 },
  { text: '   → experience.db ..................... loaded', type: 'dots', delay: 35 },
  { text: '', type: 'blank', delay: 60 },
  { text: ':: Running system checks...', type: 'systemd', delay: 70 },
  { text: '   [  OK  ] GPU acceleration: enabled', type: 'ok', delay: 45 },
  { text: '   [  OK  ] Animation pipeline: ready', type: 'ok', delay: 40 },
  { text: '   [  OK  ] Custom cursor: initialized', type: 'ok', delay: 35 },
  { text: '   [  OK  ] Grain overlay: active', type: 'ok', delay: 30 },
  { text: '', type: 'blank', delay: 80 },
  { text: '   ╔══════════════════════════════════════════════╗', type: 'box', delay: 50 },
  { text: '   ║  SAURAV KUMAR — AI BUILDER & VIBE CODER     ║', type: 'box', delay: 40 },
  { text: '   ║  B.Tech CSE · Arya College · Jaipur 2027    ║', type: 'box', delay: 40 },
  { text: '   ╚══════════════════════════════════════════════╝', type: 'box', delay: 50 },
  { text: '', type: 'blank', delay: 100 },
  { text: ':: All systems operational. Launching portfolio...', type: 'final', delay: 100 },
]

/* ─── Styled Line Component ─── */
function BootLine({ line, onDone }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
      onDone?.()
    }, line.delay)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  const colorMap = {
    header:  'text-cyan-400 font-bold',
    kernel:  'text-gray-500',
    systemd: 'text-cyan-400',
    ok:      '',
    dots:    'text-gray-400',
    blank:   '',
    box:     'text-emerald-400',
    final:   'text-green-400 font-bold',
  }

  if (line.type === 'blank') return <div className="h-3" />

  if (line.type === 'ok') {
    return (
      <div className="flex items-start">
        <span className="text-gray-300">{line.text.substring(0, 4)}</span>
        <span className="text-green-400 font-bold">{line.text.substring(4, 10)}</span>
        <span className="text-gray-300">{line.text.substring(10, 12)}</span>
        <span className="text-gray-300">{line.text.substring(12)}</span>
      </div>
    )
  }

  return (
    <div className={colorMap[line.type] || 'text-gray-300'}>
      {line.text}
    </div>
  )
}

/* ─── Progress Bar ─── */
function ProgressBar({ progress }) {
  const filled = Math.round(progress * 40)
  const empty = 40 - filled
  const bar = '█'.repeat(filled) + '░'.repeat(empty)
  return (
    <div className="font-mono text-xs mt-4">
      <span className="text-gray-500">[</span>
      <span className="text-cyan-400">{bar}</span>
      <span className="text-gray-500">]</span>
      <span className="text-gray-400 ml-2">{Math.round(progress * 100)}%</span>
    </div>
  )
}

/* ════════════════════════════════════════════
   BOOT LOADER COMPONENT
   ════════════════════════════════════════════ */
export default function BootLoader({ onComplete }) {
  const [currentLine, setCurrentLine] = useState(0)
  const [showLogo, setShowLogo] = useState(true)
  const [showBoot, setShowBoot] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [done, setDone] = useState(false)
  const scrollRef = useRef(null)
  const linesDone = useRef(0)

  // Phase 1: Show ASCII logo for a moment, then start boot
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false)
      setTimeout(() => setShowBoot(true), 300)
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  const advanceLine = useCallback(() => {
    linesDone.current += 1
    const next = linesDone.current
    if (next < BOOT_LINES.length) {
      setCurrentLine(next)
    } else {
      // Boot complete — wait, then exit
      setTimeout(() => {
        setExiting(true)
        setTimeout(() => {
          setDone(true)
          onComplete?.()
        }, 800)
      }, 600)
    }
  }, [onComplete])

  // Auto-scroll terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [currentLine])

  const progress = currentLine / (BOOT_LINES.length - 1)

  if (done) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ background: '#0a0a0a' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          animate={exiting ? { opacity: 0, scale: 1.05 } : { opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* CRT Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)',
              animation: 'scanlineScroll 8s linear infinite',
            }}
          />

          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
            }}
          />

          {/* ASCII Logo Phase */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                <pre
                  className="text-cyan-400 text-[9px] sm:text-xs md:text-sm leading-tight font-mono select-none"
                  style={{
                    textShadow: '0 0 10px rgba(0,200,255,0.5), 0 0 30px rgba(0,200,255,0.15)',
                  }}
                >
                  {ARCH_LOGO.join('\n')}
                </pre>
                <motion.div
                  className="mt-6 font-mono text-xs tracking-[6px] text-cyan-400/60 uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.5, 1] }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                >
                  SAURAV KUMAR OS
                </motion.div>
                <motion.div
                  className="mt-2 font-mono text-[10px] tracking-[3px] text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Initializing...
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Boot Sequence Phase */}
          <AnimatePresence>
            {showBoot && (
              <motion.div
                className="relative z-20 w-full max-w-3xl px-4 sm:px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Terminal window */}
                <div
                  className="rounded-lg overflow-hidden"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(10,10,10,0.95)',
                    boxShadow: '0 0 60px rgba(0,200,255,0.05), 0 0 120px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Title bar */}
                  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    <span className="ml-3 font-mono text-[11px] text-white/30">
                      saurav@arch ~ boot.log
                    </span>
                  </div>

                  {/* Terminal content */}
                  <div
                    ref={scrollRef}
                    className="p-4 sm:p-6 font-mono text-[10px] sm:text-xs leading-relaxed max-h-[60vh] overflow-y-auto"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#333 transparent',
                    }}
                  >
                    {BOOT_LINES.slice(0, currentLine + 1).map((line, i) => (
                      <BootLine
                        key={i}
                        line={line}
                        onDone={i === currentLine ? advanceLine : undefined}
                      />
                    ))}

                    {/* Blinking cursor */}
                    {currentLine < BOOT_LINES.length - 1 && (
                      <span className="inline-block w-2 h-4 bg-cyan-400 animate-[blink_1s_infinite] ml-0.5 mt-1" />
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="px-4 sm:px-6 pb-4">
                    <ProgressBar progress={progress} />
                  </div>
                </div>

                {/* Bottom hint */}
                <motion.div
                  className="text-center mt-4 font-mono text-[10px] text-gray-600"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Loading portfolio environment...
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
