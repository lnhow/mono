'use client'

import { startTransition, useEffect, useRef, useState } from 'react'

import { Button } from '@folio/ui/components/button'

import { GalaxyCanvas, type GalaxyTiltTarget } from './galaxy-canvas'

const GYRO_GAMMA_RANGE = 45
const GYRO_BETA_NEUTRAL = 45
const GYRO_BETA_RANGE = 45

type DeviceOrientationEventCtor = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val))

export function GalaxyHero() {
  const tiltTarget = useRef<GalaxyTiltTarget>({ x: 0, y: 0 })
  const gyroActive = useRef(false)
  const [motionActive, setMotionActive] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.DeviceOrientationEvent) return

    // On desktop environments (including touchscreen Windows laptops with trackpads/mice),
    // tilt is driven by mouse/pointer movement.
    // 1. Chromium (Chrome 152+) exposes `navigator.userAgentData.mobile` to distinguish desktop from mobile.
    // 2. CSS media queries check for primary fine pointer and hover capability.
    const isDesktop =
      (typeof navigator !== 'undefined' &&
        'userAgentData' in navigator &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (navigator as any).userAgentData?.mobile === false) ||
      Boolean(
        window.matchMedia?.('(hover: hover) and (pointer: fine)')?.matches,
      )
    if (isDesktop) return

    const ctor = DeviceOrientationEvent as DeviceOrientationEventCtor
    if (typeof ctor.requestPermission === 'function') {
      startTransition(() => setShowPrompt(true))
    } else {
      startTransition(() => setMotionActive(true))
    }
  }, [])

  useEffect(() => {
    if (!motionActive) return

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { beta, gamma } = event
      if (beta == null || gamma == null) return
      gyroActive.current = true
      tiltTarget.current = {
        x: clamp(gamma / GYRO_GAMMA_RANGE, -1, 1),
        y: clamp((beta - GYRO_BETA_NEUTRAL) / GYRO_BETA_RANGE, -1, 1),
      }
    }

    window.addEventListener('deviceorientation', handleOrientation, {
      passive: true,
    })
    return () =>
      window.removeEventListener('deviceorientation', handleOrientation)
  }, [motionActive])

  const handleEnableMotion = async () => {
    setShowPrompt(false)
    const ctor = DeviceOrientationEvent as DeviceOrientationEventCtor
    if (typeof ctor.requestPermission !== 'function') return

    try {
      const result = await ctor.requestPermission()
      if (result === 'granted') setMotionActive(true)
    } catch {
      // User denied or unsupported; pointer interaction remains active
    }
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (gyroActive.current) return
    const { clientWidth, clientHeight } = event.currentTarget
    tiltTarget.current = {
      x: (event.nativeEvent.offsetX / clientWidth) * 2 - 1,
      y: (event.nativeEvent.offsetY / clientHeight) * 2 - 1,
    }
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        tiltTarget.current = { x: 0, y: 0 }
      }}
      className="relative isolate flex h-full w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <GalaxyCanvas tiltTarget={tiltTarget} />
      </div>
      {showPrompt && (
        <Button
          type="button"
          onClick={handleEnableMotion}
          variant="outline"
          className="dark absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-40 rounded-full border border-white/20 bg-zinc-950/80 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-md transition hover:bg-zinc-800 hover:border-white/40 active:scale-95"
        >
          Enable motion
        </Button>
      )}
    </div>
  )
}
