'use client'

import { useRef } from 'react'

import { GalaxyCanvas, type GalaxyTiltTarget } from './galaxy-canvas'

export function GalaxyHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const tiltTarget = useRef<GalaxyTiltTarget>({ x: 0, y: 0 })

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
      <div className="absolute inset-0">
        <GalaxyCanvas tiltTarget={tiltTarget} />
      </div>
    </div>
  )
}
