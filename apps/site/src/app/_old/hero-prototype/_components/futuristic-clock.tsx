'use client'

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from 'motion/react'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import {
  getClockSnapshot,
  type ClockAngles,
  type ClockSnapshot,
} from '@/lib/hero/time'
import { cn } from '@folio/ui/lib/utils'

const CENTER = 400

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  hour12: true,
  minute: '2-digit',
  second: '2-digit',
})

const ringDefinitions = [
  {
    key: 'milliseconds',
    radius: 310,
    ticks: 100,
    length: 10,
    width: 1.5,
    showCircle: false,
    color: 'stroke-hud-line-faint',
  },
  {
    key: 'seconds',
    radius: 278,
    ticks: 60,
    length: 16,
    width: 2,
    showCircle: false,
    color: 'stroke-hud-line-soft',
  },
  {
    key: 'minutes',
    radius: 238,
    ticks: 60,
    length: 22,
    width: 3,
    showCircle: true,
    color: 'stroke-hud-line',
  },
  { key: 'hours', radius: 190, ticks: 12, length: 34, width: 7, showCircle: false, color: undefined },
] as const satisfies ReadonlyArray<{
  key: keyof ClockAngles
  radius: number
  ticks: number
  length: number
  width: number
  showCircle?: boolean
  color?: string
}>

interface ClockControllerProps {
  onSnapshot: (snapshot: ClockSnapshot) => void
}

function ContinuousClockController({ onSnapshot }: ClockControllerProps) {
  useAnimationFrame(() => onSnapshot(getClockSnapshot(new Date(), false)))
  return null
}

function MechanicalClockController({ onSnapshot }: ClockControllerProps) {
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    const update = () => onSnapshot(getClockSnapshot(new Date(), true))
    const timeout = setTimeout(
      () => {
        update()
        interval = setInterval(update, 1000)
      },
      1000 - (Date.now() % 1000),
    )

    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [onSnapshot])

  return null
}

function ClockRing({
  angle,
  definition,
}: {
  angle: MotionValue<number>
  definition: (typeof ringDefinitions)[number]
}) {
  const { key, length, radius, ticks, width, color, showCircle } = definition

  return (
    <motion.g
      data-ring={key}
      style={{
        rotate: angle,
        transformBox: 'view-box',
        transformOrigin: 'center',
      }}
    >
      {showCircle && (
        <circle
          className="hero-clock-guide"
          cx={CENTER}
          cy={CENTER}
          fill="none"
          stroke="currentColor"
          r={radius}
        />
      )}
      {Array.from({ length: ticks }, (_, index) => (
        <line
          className={cn('hero-clock-tick', color)}
          key={index}
          stroke="currentColor"
          strokeWidth={index % 7 === 0 ? width * 1.45 : width}
          transform={`rotate(${(index / ticks) * 360} ${CENTER} ${CENTER})`}
          x1={CENTER}
          x2={CENTER}
          y1={CENTER - radius}
          y2={CENTER - radius + (index % 7 === 0 ? length * 1.35 : length)}
        />
      ))}
    </motion.g>
  )
}

export function FuturisticClock() {
  const initial = getClockSnapshot(new Date(), false)
  const milliseconds = useMotionValue(initial.angles.milliseconds)
  const seconds = useMotionValue(initial.angles.seconds)
  const minutes = useMotionValue(initial.angles.minutes)
  const hours = useMotionValue(initial.angles.hours)
  const values = useMemo<Record<keyof ClockAngles, MotionValue<number>>>(
    () => ({ milliseconds, seconds, minutes, hours }),
    [hours, milliseconds, minutes, seconds],
  )
  const angleRefs = useRef<
    Partial<Record<keyof ClockAngles, HTMLOutputElement | null>>
  >({})
  const dateRef = useRef<HTMLTimeElement>(null)
  const timeRef = useRef<HTMLTimeElement>(null)
  const reducedMotion = useReducedMotion()

  const updateSnapshot = useCallback(
    (snapshot: ClockSnapshot) => {
      for (const key of Object.keys(snapshot.angles) as Array<
        keyof ClockAngles
      >) {
        values[key].set(snapshot.angles[key])
        const output = angleRefs.current[key]
        if (output) output.value = `${snapshot.angles[key].toFixed(2)}°`
      }

      if (dateRef.current)
        dateRef.current.textContent = dateFormatter.format(snapshot.date)
      if (timeRef.current) {
        timeRef.current.dateTime = snapshot.date.toISOString()
        timeRef.current.textContent = timeFormatter.format(snapshot.date)
      }
    },
    [values],
  )

  return (
    <motion.section
      animate={{ opacity: 1 }}
      aria-label="Local time"
      className="hero-clock"
      initial={{ opacity: 0 }}
      role="timer"
      transition={{ duration: reducedMotion ? 0 : 0.45 }}
    >
      {reducedMotion ? (
        <MechanicalClockController
          key="mechanical"
          onSnapshot={updateSnapshot}
        />
      ) : (
        <ContinuousClockController
          key="continuous"
          onSnapshot={updateSnapshot}
        />
      )}

      <svg
        aria-label="Four-ring local time clock"
        className="hero-clock-face"
        role="img"
        viewBox="0 0 800 800"
      >
        <circle className="hero-clock-core" cx={CENTER} cy={CENTER} r="142" />
        {ringDefinitions.map((definition) => (
          <ClockRing
            angle={values[definition.key]}
            definition={definition}
            key={definition.key}
          />
        ))}
        <path
          className="hero-clock-connector"
          d={`M ${CENTER} ${CENTER} L 560 248 H 700`}
          fill="none"
        />
      </svg>

      <div className="hero-clock-readout">
        <time ref={dateRef}>{dateFormatter.format(initial.date)}</time>
        <time ref={timeRef} dateTime={initial.date.toISOString()}>
          {timeFormatter.format(initial.date)}
        </time>
      </div>

      <div aria-label="Clock ring angles" className="hero-clock-angles">
        {ringDefinitions.map(({ key }) => (
          <output
            data-angle={key}
            key={key}
            ref={(node) => {
              angleRefs.current[key] = node
            }}
          >
            {initial.angles[key].toFixed(2)}°
          </output>
        ))}
      </div>
    </motion.section>
  )
}
