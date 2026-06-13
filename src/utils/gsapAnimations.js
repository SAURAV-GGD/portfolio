import gsap from 'gsap'

/**
 * createHeroEntrance — Builds the master GSAP timeline for the hero entrance sequence.
 *
 * Steps:
 * 1. Fade in vignette
 * 2. Glow backgrounds emerge
 * 3. Images scale 1.08 → 1, opacity 0 → 1
 * 4. Reveal system activates (handled externally)
 * 5. Heading lines stagger reveal
 * 6. Paragraph fade-up
 * 7. Buttons slide upward
 *
 * @param {Object} refs — DOM element refs
 * @returns {gsap.core.Timeline}
 */
export function createHeroEntrance(refs) {
  const {
    vignetteEl,
    primaryGlowEl,
    secondaryGlowEl,
    topImageEl,
    bottomImageEl,
    eyebrowEl,
    headingLines,
    paragraphEl,
    buttonsEl,
    scrollHintEl,
  } = refs

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const tl = gsap.timeline({
    defaults: {
      ease: 'power3.out',
    },
  })

  if (prefersReduced) {
    // Instant reveal for reduced motion
    const allEls = [
      vignetteEl, primaryGlowEl, secondaryGlowEl,
      topImageEl, bottomImageEl, eyebrowEl,
      paragraphEl, buttonsEl, scrollHintEl,
    ].filter(Boolean)

    allEls.forEach(el => {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 })
    })

    if (headingLines?.length) {
      headingLines.forEach(line => {
        gsap.set(line, { opacity: 1, y: 0 })
      })
    }

    return tl
  }

  // Step 1: Vignette fade-in
  if (vignetteEl) {
    gsap.set(vignetteEl, { opacity: 0 })
    tl.to(vignetteEl, { opacity: 1, duration: 0.8 }, 0)
  }

  // Step 2: Glow backgrounds emerge
  if (primaryGlowEl) {
    gsap.set(primaryGlowEl, { opacity: 0, scale: 0.8 })
    tl.to(primaryGlowEl, {
      opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out',
    }, 0.2)
  }
  if (secondaryGlowEl) {
    gsap.set(secondaryGlowEl, { opacity: 0, scale: 0.8 })
    tl.to(secondaryGlowEl, {
      opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out',
    }, 0.4)
  }

  // Step 3: Images scale 1.08 → 1, opacity 0 → 1
  if (topImageEl) {
    gsap.set(topImageEl, { opacity: 0, scale: 1.08 })
    tl.to(topImageEl, {
      opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
    }, 0.3)
  }
  if (bottomImageEl) {
    gsap.set(bottomImageEl, { opacity: 0, scale: 1.08 })
    tl.to(bottomImageEl, {
      opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
    }, 0.3)
  }

  // Step 5: Eyebrow text
  if (eyebrowEl) {
    gsap.set(eyebrowEl, { opacity: 0, y: 20 })
    tl.to(eyebrowEl, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    }, 0.7)
  }

  // Step 5: Heading lines stagger
  if (headingLines?.length) {
    headingLines.forEach(line => {
      gsap.set(line, { opacity: 0, y: 60 })
    })
    tl.to(headingLines, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      stagger: 0.12,
    }, 0.85)
  }

  // Step 6: Paragraph fade-up
  if (paragraphEl) {
    gsap.set(paragraphEl, { opacity: 0, y: 30 })
    tl.to(paragraphEl, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    }, 1.3)
  }

  // Step 7: Buttons slide upward
  if (buttonsEl) {
    gsap.set(buttonsEl, { opacity: 0, y: 30 })
    tl.to(buttonsEl, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    }, 1.5)
  }

  // Scroll hint
  if (scrollHintEl) {
    gsap.set(scrollHintEl, { opacity: 0, y: 10 })
    tl.to(scrollHintEl, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
    }, 1.8)
  }

  return tl
}

/**
 * createNavEntrance — GSAP timeline for navbar entrance
 */
export function createNavEntrance(navEl, navItems) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  if (prefersReduced) {
    if (navEl) gsap.set(navEl, { opacity: 1, y: 0 })
    if (navItems?.length) {
      navItems.forEach(item => gsap.set(item, { opacity: 1, y: 0 }))
    }
    return tl
  }

  if (navEl) {
    gsap.set(navEl, { opacity: 0, y: -30 })
    tl.to(navEl, { opacity: 1, y: 0, duration: 0.8 }, 0.2)
  }

  if (navItems?.length) {
    navItems.forEach(item => gsap.set(item, { opacity: 0, y: -10 }))
    tl.to(navItems, {
      opacity: 1, y: 0, duration: 0.5,
      stagger: 0.06,
    }, 0.5)
  }

  return tl
}

/**
 * createGlowPulse — Infinite subtle pulse on glow elements
 */
export function createGlowPulse(el, options = {}) {
  const {
    scaleMin = 1,
    scaleMax = 1.08,
    duration = 7,
  } = options

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return null

  return gsap.to(el, {
    scale: scaleMax,
    duration,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  })
}
