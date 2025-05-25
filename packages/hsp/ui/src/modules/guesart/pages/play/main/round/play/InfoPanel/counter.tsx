import { useAtomValue } from 'jotai'
import { memo, useEffect, useMemo, useState } from 'react'
import { roomRoundAtom } from '../../../../_state/store'

export const Counter = memo(function Counter() {
  const { endAt: endedAt } = useAtomValue(roomRoundAtom)
  const timeLimit = useMemo(() => {
    if (!endedAt) {
      return 0
    }
    const timeLimit = endedAt - Date.now()
    return timeLimit > 0 ? timeLimit : 0
  }, [endedAt])

  const onTimeUp = () => {
    console.log('Time up!')
  }

  return <InternalCounter timeLimit={timeLimit} onTimeUp={onTimeUp} />
})

interface CounterProps {
  timeLimit: number
  onTimeUp?: () => void
}

function InternalCounter({ timeLimit, onTimeUp }: CounterProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onTimeUp?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [onTimeUp, timeLimit])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="text-2xl m-4">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  )
}
