import { useAtomValue } from 'jotai'
import {
  memo,
  startTransition,
  useEffect,
  useEffectEvent,
  useState,
} from 'react'
import { roomRoundAtom } from '../../../../_state/store'
import { socketAtom } from '@hsp/ui/modules/guesart/state/store'
import { EClientToServerEvents } from '@hsp/ui/modules/guesart/state/type/socket'

export const Counter = memo(function Counter() {
  const { socket } = useAtomValue(socketAtom)
  const { endAt } = useAtomValue(roomRoundAtom)
  const [timeLeft, setTimeLeft] = useState(0)

  const onTimeUpdate = useEffectEvent((timerId: number) => {
    if (timeLeft > 1) {
      setTimeLeft((prev) => prev - 1)
      return
    }

    setTimeLeft(0)
    clearInterval(timerId)
    socket?.emitWithAck(EClientToServerEvents.ROUND_END)
  })

  useEffect(() => {
    // Reset time left when endAt changes
    startTransition(() => {
      setTimeLeft(Math.round((endAt - Date.now()) / 1000))
    })

    const timer = window.setInterval(() => {
      onTimeUpdate(timer)
    }, 1000)

    return () => clearInterval(timer)
  }, [endAt])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="text-2xl m-4">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  )
})
