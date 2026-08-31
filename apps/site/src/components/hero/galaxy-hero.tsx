'use client'

import { startTransition, useEffect, useRef, useState } from 'react'

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
        <button
          type="button"
          onClick={handleEnableMotion}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white/20"
        >
          Enable motion
        </button>
      )}
    </div>
  )
}
