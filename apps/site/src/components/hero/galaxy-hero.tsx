'use client'

import { useEffect, useRef, useState } from 'react'

import { useParallax } from '@/hooks/use-parallax'

import { GalaxyCanvas, type GalaxyTiltTarget } from './galaxy-canvas'

export function GalaxyHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  useParallax(containerRef)

  const tiltTarget = useRef<GalaxyTiltTarget>({ x: 0, y: 0 })
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpened(true), 600)
    return () => clearTimeout(timer)
  }, [])

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    tiltTarget.current = {
      x: ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      y: ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
    }
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative isolate flex h-full w-full items-center justify-center overflow-hidden"
    >
      {/* Background Halftone 1 (Deepest, sparsest) */}
      <div
        className="absolute inset-[-150%] bg-halftone text-instrument-foreground opacity-[0.03] pointer-events-none"
        style={{
          backgroundSize: '32px 32px',
          '--parallax-depth-x': 0.1,
          '--parallax-depth-y': 0.1,
          '--scroll-depth': -0.1,
          transform: `translate3d(calc(var(--parallax-x) * 1px * var(--parallax-depth-x)), calc((var(--parallax-y) * var(--parallax-depth-y) + var(--scroll-y) * var(--scroll-depth)) * 1px), 0)`
        } as React.CSSProperties}
      />

      {/* Background Halftone 2 (Mid) */}
      <div
        className="absolute inset-[-100%] bg-halftone text-instrument-foreground opacity-[0.05] pointer-events-none"
        style={{
          backgroundSize: '16px 16px',
          '--parallax-depth-x': 0.2,
          '--parallax-depth-y': 0.2,
          '--scroll-depth': -0.3,
          transform: `translate3d(calc(var(--parallax-x) * 1px * var(--parallax-depth-x)), calc((var(--parallax-y) * var(--parallax-depth-y) + var(--scroll-y) * var(--scroll-depth)) * 1px), 0)`
        } as React.CSSProperties}
      />

      {/* Background Halftone 3 (Closer) */}
      <div
        className="absolute inset-[-50%] bg-halftone text-instrument-foreground opacity-[0.08] pointer-events-none"
        style={{
          backgroundSize: '8px 8px',
          '--parallax-depth-x': 0.3,
          '--parallax-depth-y': 0.3,
          '--scroll-depth': -0.5,
          transform: `translate3d(calc(var(--parallax-x) * 1px * var(--parallax-depth-x)), calc((var(--parallax-y) * var(--parallax-depth-y) + var(--scroll-y) * var(--scroll-depth)) * 1px), 0)`
        } as React.CSSProperties}
      />

      {/* Galaxy canvas (transparent; the dark stage shows through) */}
      <div className="absolute inset-0">
        <GalaxyCanvas tiltTarget={tiltTarget} />
      </div>

      {/* Blast Doors (Armor Panels) - Fixed to container, no parallax */}
      <div
        className="absolute inset-0 z-40 flex pointer-events-none"
        aria-hidden
      >
        {/* Left Panel */}
        <div
          className="h-full w-1/2 bg-card border-r-2 border-primary/10 chamfer-surface shadow-2xl transition-transform duration-1000 ease-in-out relative flex items-center justify-end pr-4 md:pr-8"
          style={{ transform: isOpened ? 'translateX(-100%)' : 'translateX(0)' }}
        >
          <div className="w-1 md:w-2 h-16 md:h-32 bg-primary/20 rounded-full animate-pulse" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] md:text-xs text-primary/30 tracking-widest font-mono rotate-180" style={{ writingMode: 'vertical-rl' }}>
            SYS.INIT // L-PANEL
          </div>
        </div>
        {/* Right Panel */}
        <div
          className="h-full w-1/2 bg-card border-l-2 border-primary/10 chamfer-surface shadow-2xl transition-transform duration-1000 ease-in-out relative flex items-center justify-start pl-4 md:pl-8"
          style={{ transform: isOpened ? 'translateX(100%)' : 'translateX(0)' }}
        >
          <div className="w-1 md:w-2 h-16 md:h-32 bg-primary/20 rounded-full animate-pulse" />
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] md:text-xs text-primary/30 tracking-widest font-mono" style={{ writingMode: 'vertical-rl' }}>
            SYS.INIT // R-PANEL
          </div>
        </div>
      </div>
    </div>
  )
}
