'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { GalaxyCanvas, type GalaxyTiltTarget } from './galaxy-canvas'

const GYRO_GAMMA_RANGE = 45
const GYRO_BETA_NEUTRAL = 45
const GYRO_BETA_RANGE = 45

type DeviceOrientationEventCtor = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

export function GalaxyHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const tiltTarget = useRef<GalaxyTiltTarget>({ x: 0, y: 0 })
  const gyroCleanupRef = useRef<(() => void) | null>(null)
  const gyroActiveRef = useRef(false)
  const [showMotionPrompt, setShowMotionPrompt] = useState(false)

  const attachGyro = useCallback(() => {
    if (gyroCleanupRef.current) return
    const handler = (event: DeviceOrientationEvent) => {
      const { beta, gamma } = event
      if (beta == null || gamma == null) return
      gyroActiveRef.current = true
      tiltTarget.current = {
        x: clamp(gamma / GYRO_GAMMA_RANGE, -1, 1),
        y: clamp((beta - GYRO_BETA_NEUTRAL) / GYRO_BETA_RANGE, -1, 1),
      }
    }
    window.addEventListener('deviceorientation', handler, { passive: true })
    gyroCleanupRef.current = () => {
      window.removeEventListener('deviceorientation', handler)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (typeof window.DeviceOrientationEvent === 'undefined') return

    // Handle iOS 13+ requirement for explicit user permission
    const ctor = DeviceOrientationEvent as DeviceOrientationEventCtor
    if (typeof ctor.requestPermission === 'function') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowMotionPrompt(true)
      return
    }
    // Non-iOS 13+ devices (Android, older iOS)
    attachGyro()
  }, [attachGyro])

  useEffect(
    () => () => {
      gyroCleanupRef.current?.()
    },
    [],
  )

  const handleEnableMotion = useCallback(async () => {
    setShowMotionPrompt(false)
    const ctor = DeviceOrientationEvent as DeviceOrientationEventCtor
    if (typeof ctor.requestPermission !== 'function') return
    if (gyroCleanupRef.current) return

    let granted = false
    try {
      const result = await ctor.requestPermission()
      granted = result === 'granted'
    } catch {
      // user agent denied or threw; fall back to pointer
    }

    if (granted) attachGyro()
  }, [attachGyro])

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (gyroActiveRef.current) return
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
      {showMotionPrompt && (
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
