import { useAtomValue } from 'jotai'
import { memo, useEffect, useMemo, useState } from 'react'
import { roomRoundAtom } from '../../../../_state/store'
import { socketAtom } from '@hsp/ui/src/modules/guesart/state/store'
import { EClientToServerEvents } from '@hsp/ui/src/modules/guesart/state/type/socket'

export const Counter = memo(function Counter() {
  const { socket } = useAtomValue(socketAtom)
  const { endAt } = useAtomValue(roomRoundAtom)
  const timeLimit = useMemo(() => {
    if (!endAt) {
      return 0
    }
    const timeLimit = Math.round((endAt - Date.now()) / 1000)
    return timeLimit > 0 ? timeLimit : 0
  }, [endAt])

  const onTimeUp = () => {
    console.log('Time up!')
    socket?.emitWithAck(EClientToServerEvents.ROUND_END)
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
    setTimeLeft(timeLimit)
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
