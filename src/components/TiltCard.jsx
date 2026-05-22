import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { forwardRef } from 'react'

const motionMap = {
  a: motion.a,
  article: motion.article,
  div: motion.div,
  li: motion.li,
  section: motion.section,
  span: motion.span,
}

const TiltCard = forwardRef(function TiltCard(
  {
    as = 'div',
    className = '',
    children,
    tilt = 12,
    glare = true,
    style,
    ...props
  },
  ref,
) {
  const prefersReducedMotion = useReducedMotion()
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rawScale = useMotionValue(1)
  const rawGlareOpacity = useMotionValue(0)

  const rotateX = useSpring(rawRotateX, { stiffness: 180, damping: 18, mass: 0.7 })
  const rotateY = useSpring(rawRotateY, { stiffness: 180, damping: 18, mass: 0.7 })
  const scale = useSpring(rawScale, { stiffness: 220, damping: 18, mass: 0.5 })
  const glareOpacity = useSpring(rawGlareOpacity, { stiffness: 180, damping: 20, mass: 0.5 })

  const MotionComponent = motionMap[as] || motion.div

  const resetTilt = event => {
    if (prefersReducedMotion) return

    const card = event.currentTarget
    card.style.setProperty('--tilt-x', '50%')
    card.style.setProperty('--tilt-y', '50%')

    rawRotateX.set(0)
    rawRotateY.set(0)
    rawScale.set(1)
    rawGlareOpacity.set(0)
  }

  const handlePointerMove = event => {
    if (prefersReducedMotion) return

    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top

    const xPct = offsetX / rect.width
    const yPct = offsetY / rect.height

    rawRotateX.set((0.5 - yPct) * tilt)
    rawRotateY.set((xPct - 0.5) * tilt)
    rawScale.set(1.03)
    rawGlareOpacity.set(1)

    card.style.setProperty('--tilt-x', `${Math.round(xPct * 100)}%`)
    card.style.setProperty('--tilt-y', `${Math.round(yPct * 100)}%`)
  }

  return (
    <MotionComponent
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
      className={`relative overflow-hidden ${className}`.trim()}
      style={{
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        '--tilt-x': '50%',
        '--tilt-y': '50%',
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        scale: prefersReducedMotion ? 1 : scale,
        ...style,
      }}
      {...props}
    >
      {children}

      {/* border-beam removed per revert request */}

      {glare && !prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            opacity: glareOpacity,
            background:
              'radial-gradient(circle at var(--tilt-x) var(--tilt-y), rgba(255,255,255,0.14), transparent 52%)',
            transform: 'translateZ(1px)',
          }}
        />
      )}
    </MotionComponent>
  )
})

export default TiltCard