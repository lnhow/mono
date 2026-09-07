'use client'

import { useMotionValueEvent, useScroll } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'

import { clampScrollPosition, formatPixelPosition } from '@/lib/hero/scroll'

export function ScrollRuler() {
  const { scrollY } = useScroll()
  const [label, setLabel] = useState('0 px')

  const updateLabel = useCallback((position: number) => {
    const clamped = clampScrollPosition(
      position,
      document.documentElement.scrollHeight,
      window.innerHeight,
    )
    const nextLabel = formatPixelPosition(clamped)
    setLabel((current) => (current === nextLabel ? current : nextLabel))
  }, [])

  useMotionValueEvent(scrollY, 'change', updateLabel)

  useEffect(() => {
    const onResize = () => updateLabel(window.scrollY)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [updateLabel])

  return (
    <>
      <div aria-label="Scroll ruler track" className="hero-scroll-ruler-track" />
      <aside aria-label="Current scroll height" className="hero-scroll-ruler-indicator">
        <span className="hero-scroll-ruler-value">{label}</span>
        <span className="hero-scroll-ruler-label">scroll-height</span>
      </aside>
    </>
  )
}
