'use client'

import { useRef, useEffect, useState } from 'react'
import { useParallax } from '@/hooks/use-parallax'

export function MechaHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  useParallax(containerRef)
  
  const [isOpened, setIsOpened] = useState(false)
  
  useEffect(() => {
    // Blast doors open shortly after mount
    const timer = setTimeout(() => setIsOpened(true), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[600px] md:h-[800px] max-h-screen overflow-hidden bg-background flex items-center justify-center isolate"
    >
      {/* Background Halftone 1 (Deepest, sparsest) */}
      <div 
        className="absolute inset-[-150%] bg-halftone opacity-[0.03] pointer-events-none"
        style={{
          backgroundSize: '32px 32px',
          '--parallax-depth-x': 0.1,
          '--parallax-depth-y': 0.1,
          '--scroll-depth': -0.1, // Negative so it translates up when scrolling down
          transform: `translate3d(calc(var(--parallax-x) * 1px * var(--parallax-depth-x)), calc((var(--parallax-y) * var(--parallax-depth-y) + var(--scroll-y) * var(--scroll-depth)) * 1px), 0)`
        } as React.CSSProperties}
      />

      {/* Background Halftone 2 (Mid) */}
      <div 
        className="absolute inset-[-100%] bg-halftone opacity-[0.05] pointer-events-none"
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
        className="absolute inset-[-50%] bg-halftone opacity-[0.08] pointer-events-none"
        style={{
          backgroundSize: '8px 8px',
          '--parallax-depth-x': 0.3,
          '--parallax-depth-y': 0.3,
          '--scroll-depth': -0.5,
          transform: `translate3d(calc(var(--parallax-x) * 1px * var(--parallax-depth-x)), calc((var(--parallax-y) * var(--parallax-depth-y) + var(--scroll-y) * var(--scroll-depth)) * 1px), 0)`
        } as React.CSSProperties}
      />
      
      {/* Aegis HUD Core (Parallax Layer - Mid) spans the whole section */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          '--parallax-depth-x': 0.5,
          '--parallax-depth-y': 0.5,
          '--scroll-depth': -0.7,
          transform: `translate3d(calc(var(--parallax-x) * 1px * var(--parallax-depth-x)), calc((var(--parallax-y) * var(--parallax-depth-y) + var(--scroll-y) * var(--scroll-depth)) * 1px), 0)`
        } as React.CSSProperties}
      >
        <AegisHud />
      </div>
      
      {/* Foreground Elements (Parallax Layer - Close) */}
      <div 
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{
          '--parallax-depth-x': 0.8,
          '--parallax-depth-y': 0.8,
          '--scroll-depth': -1.2,
          transform: `translate3d(calc(var(--parallax-x) * 1px * var(--parallax-depth-x)), calc((var(--parallax-y) * var(--parallax-depth-y) + var(--scroll-y) * var(--scroll-depth)) * 1px), 0)`
        } as React.CSSProperties}
      >
        {/* Floating targeting brackets, more subtle */}
        <div className="w-[400px] h-[400px] md:w-[800px] md:h-[800px] border border-hud-line-faint rounded-full relative opacity-30">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-8 border-x border-primary/30" />
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-8 border-x border-primary/30" />
           <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-8 border-y border-primary/30" />
           <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-4 w-8 border-y border-primary/30" />
        </div>
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

function AegisHud() {
  return (
    // Oversized to span the whole section, colors made subtle/transparent
    <div className="relative w-[150vw] h-[150vw] md:w-[120vw] md:h-[120vw] max-w-[1500px] max-h-[1500px] flex items-center justify-center opacity-40">
      {/* Outer Ring */}
      <svg className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" className="stroke-hud-line-faint" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="46" fill="none" className="stroke-primary/20" strokeWidth="0.5" strokeDasharray="10 30" />
        <circle cx="50" cy="50" r="46" fill="none" className="stroke-accent/20" strokeWidth="0.2" strokeDasharray="2 10" strokeDashoffset="5" />
      </svg>
      
      {/* Mid Ring - Counter Rotating */}
      <svg className="absolute inset-[10%] w-[80%] h-[80%] animate-[spin_30s_linear_infinite_reverse]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" className="stroke-hud-line-soft" strokeWidth="1" strokeDasharray="40 10" />
        <circle cx="50" cy="50" r="40" fill="none" className="stroke-primary/30" strokeWidth="0.2" />
      </svg>
      
      {/* Inner Core */}
      <svg className="absolute inset-[25%] w-[50%] h-[50%] animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" className="stroke-accent/30" strokeWidth="2" strokeDasharray="1 15" strokeLinecap="round" />
        <circle cx="50" cy="50" r="35" fill="none" className="stroke-hud-line-soft" strokeWidth="3" strokeDasharray="50 50" />
      </svg>
      
      {/* Hexagon Core (Gundam style) */}
      <svg className="absolute inset-[40%] w-[20%] h-[20%] animate-[spin_25s_linear_infinite_reverse]" viewBox="0 0 100 100">
        <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" className="stroke-primary/20" strokeWidth="1" />
        <polygon points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" fill="none" className="stroke-primary/30" strokeWidth="0.5" />
      </svg>

      {/* Center glowing element - significantly reduced intensity */}
      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-primary/10 blur-md absolute" />
      <div className="w-4 h-4 md:w-6 md:h-6 rounded-full border border-primary/30 absolute animate-ping opacity-30" style={{ animationDuration: '4s' }} />
      <div className="w-2 h-2 md:w-3 md:h-3 bg-primary/40 rounded-full absolute" />
    </div>
  )
}
