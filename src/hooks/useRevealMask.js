import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'

/**
 * useRevealMask — Premium cursor-tracking radial mask reveal system
 *
 * Returns refs to attach to the reveal container and bottom-layer image.
 * The mask follows the cursor with GSAP quickTo interpolation,
 * breathes organically, and expands on scroll.
 */
export default function useRevealMask(heroRef) {
  const maskRef = useRef(null) // the bottom image element
  const state = useRef({
    radius: 0,
    targetRadius: 150,
    breatheRadius: 150,
    mouseX: 0,
    mouseY: 0,
    isHovering: false,
    scrollProgress: 0,
    prefersReducedMotion: false,
    quickX: null,
    quickY: null,
    smoothX: 0,
    smoothY: 0,
    breatheTween: null,
    enterTween: null,
    leaveTween: null,
    tickerId: null,
  })

  const applyMask = useCallback(() => {
    const el = maskRef.current
    if (!el) return

    const s = state.current
    const r = s.radius
    const blur = Math.max(0, 25 - (r / s.breatheRadius) * 20) // feathered edge
    const maskValue = `radial-gradient(circle ${r}px at ${s.smoothX}px ${s.smoothY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) ${r * 0.3}px, rgba(0,0,0,0.7) ${r * 0.6}px, rgba(0,0,0,0.3) ${r * 0.85}px, transparent ${r}px)`

    el.style.maskImage = maskValue
    el.style.webkitMaskImage = maskValue
  }, [])

  useEffect(() => {
    const hero = heroRef?.current
    const el = maskRef.current
    if (!hero || !el) return

    const s = state.current

    // Check reduced motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    s.prefersReducedMotion = mq.matches
    const onMotionChange = (e) => { s.prefersReducedMotion = e.matches }
    mq.addEventListener('change', onMotionChange)

    // GPU hints
    el.style.willChange = 'mask-image'
    el.style.transform = 'translateZ(0)'
    el.style.backfaceVisibility = 'hidden'

    // Initially hidden
    el.style.maskImage = 'radial-gradient(circle 0px at 0px 0px, transparent 0px)'
    el.style.webkitMaskImage = 'radial-gradient(circle 0px at 0px 0px, transparent 0px)'

    // GSAP quickTo for ultra-smooth cursor interpolation
    const quickXObj = { value: 0 }
    const quickYObj = { value: 0 }

    s.quickX = gsap.quickTo(quickXObj, 'value', {
      duration: 0.4,
      ease: 'power2.out',
      onUpdate: () => { s.smoothX = quickXObj.value },
    })
    s.quickY = gsap.quickTo(quickYObj, 'value', {
      duration: 0.4,
      ease: 'power2.out',
      onUpdate: () => { s.smoothY = quickYObj.value },
    })

    // Breathing animation (organic radius oscillation)
    if (!s.prefersReducedMotion) {
      const breatheObj = { r: 150 }
      s.breatheTween = gsap.to(breatheObj, {
        r: 155,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          s.breatheRadius = breatheObj.r
          if (s.isHovering) {
            const scrollBonus = s.scrollProgress * 150 // 150px → 300px on scroll
            s.targetRadius = s.breatheRadius + scrollBonus
          }
        },
      })
      // Also oscillate between 140-155
      gsap.to(breatheObj, {
        r: 140,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      })
    }

    // GSAP ticker for applying mask at 60fps
    const tickerFn = () => {
      if (!s.isHovering && s.radius <= 0.5) return

      // Lerp radius toward target
      const diff = s.targetRadius - s.radius
      s.radius += diff * 0.08

      if (s.radius < 0.5 && !s.isHovering) {
        s.radius = 0
        return
      }

      applyMask()
    }
    gsap.ticker.add(tickerFn)
    s.tickerId = tickerFn

    // Mouse event handlers
    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      s.mouseX = x
      s.mouseY = y

      if (s.quickX) s.quickX(x)
      if (s.quickY) s.quickY(y)
    }

    const handleMouseEnter = () => {
      s.isHovering = true

      // Kill any leave animation
      if (s.leaveTween) s.leaveTween.kill()

      const scrollBonus = s.scrollProgress * 150
      s.targetRadius = s.breatheRadius + scrollBonus

      // Animate radius from 0 to target
      s.enterTween = gsap.to(s, {
        radius: s.targetRadius,
        duration: 0.6,
        ease: 'power3.out',
      })
    }

    const handleMouseLeave = () => {
      s.isHovering = false

      // Kill enter animation
      if (s.enterTween) s.enterTween.kill()

      // Cinematic dissolve — shrink + blur
      s.leaveTween = gsap.to(s, {
        radius: 0,
        targetRadius: 0,
        duration: 0.8,
        ease: 'power2.in',
        onUpdate: applyMask,
      })
    }

    hero.addEventListener('mousemove', handleMouseMove)
    hero.addEventListener('mouseenter', handleMouseEnter)
    hero.addEventListener('mouseleave', handleMouseLeave)

    // Cleanup
    return () => {
      hero.removeEventListener('mousemove', handleMouseMove)
      hero.removeEventListener('mouseenter', handleMouseEnter)
      hero.removeEventListener('mouseleave', handleMouseLeave)
      mq.removeEventListener('change', onMotionChange)

      if (s.breatheTween) s.breatheTween.kill()
      if (s.enterTween) s.enterTween.kill()
      if (s.leaveTween) s.leaveTween.kill()
      if (s.tickerId) gsap.ticker.remove(s.tickerId)
    }
  }, [heroRef, applyMask])

  // Expose method for ScrollTrigger to update scroll progress
  const setScrollProgress = useCallback((progress) => {
    state.current.scrollProgress = progress
    if (state.current.isHovering) {
      const scrollBonus = progress * 150
      state.current.targetRadius = state.current.breatheRadius + scrollBonus
    }
  }, [])

  return { maskRef, setScrollProgress, state }
}
