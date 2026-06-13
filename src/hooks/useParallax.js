import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * useParallax — Subtle cursor-driven parallax for hero image layers
 *
 * topRef moves 0–6px, bottomRef moves 0–10px, at different speeds.
 * Disabled when prefers-reduced-motion is active.
 */
export default function useParallax(heroRef) {
  const topLayerRef = useRef(null)
  const bottomLayerRef = useRef(null)

  useEffect(() => {
    const hero = heroRef?.current
    if (!hero) return

    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const topEl = topLayerRef.current
    const bottomEl = bottomLayerRef.current

    // quickTo for ultra-smooth parallax interpolation
    let topQX, topQY, bottomQX, bottomQY

    if (topEl) {
      topQX = gsap.quickTo(topEl, 'x', { duration: 0.8, ease: 'power2.out' })
      topQY = gsap.quickTo(topEl, 'y', { duration: 0.8, ease: 'power2.out' })
    }
    if (bottomEl) {
      bottomQX = gsap.quickTo(bottomEl, 'x', { duration: 1.0, ease: 'power2.out' })
      bottomQY = gsap.quickTo(bottomEl, 'y', { duration: 1.0, ease: 'power2.out' })
    }

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalized -1 to 1
      const nx = (e.clientX - centerX) / (rect.width / 2)
      const ny = (e.clientY - centerY) / (rect.height / 2)

      // Top layer: subtle 0-6px
      if (topQX && topQY) {
        topQX(nx * 6)
        topQY(ny * 6)
      }

      // Bottom layer: slightly more 0-10px
      if (bottomQX && bottomQY) {
        bottomQX(nx * 10)
        bottomQY(ny * 10)
      }
    }

    const handleMouseLeave = () => {
      // Reset to center
      if (topQX && topQY) {
        topQX(0)
        topQY(0)
      }
      if (bottomQX && bottomQY) {
        bottomQX(0)
        bottomQY(0)
      }
    }

    hero.addEventListener('mousemove', handleMouseMove)
    hero.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove)
      hero.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [heroRef])

  return { topLayerRef, bottomLayerRef }
}
