import { useEffect, type RefObject } from 'react'

export function useParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!ref.current) return

    let animationFrameId: number
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    // Smoothness factor
    const ease = 0.08

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma === null || event.beta === null) return
      
      // gamma is left-to-right (-90 to 90)
      // beta is front-to-back (-180 to 180). Assume 45deg is resting position.
      const gamma = Math.min(Math.max(event.gamma, -45), 45)
      const beta = Math.min(Math.max(event.beta - 45, -45), 45)

      // Normalize to roughly -100 to 100 range
      targetX = gamma * 2.5
      targetY = beta * 2.5
    }

    let scrollY = 0
    const updateScroll = () => {
      scrollY = window.scrollY
    }

    const animate = () => {
      currentX += (targetX - currentX) * ease
      currentY += (targetY - currentY) * ease
      
      if (ref.current) {
        // Expose normalized base variables
        // --parallax-x: Gyro X (approx -100 to 100)
        // --parallax-y: Gyro Y (approx -100 to 100)
        // --scroll-y: Scroll Y (pixels)
        ref.current.style.setProperty('--parallax-x', `${currentX}`)
        ref.current.style.setProperty('--parallax-y', `${currentY}`)
        ref.current.style.setProperty('--scroll-y', `${scrollY}`)
      }
      
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('deviceorientation', handleOrientation, { passive: true })
    
    updateScroll()
    animate()

    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('deviceorientation', handleOrientation)
      cancelAnimationFrame(animationFrameId)
    }
  }, [ref])
}
