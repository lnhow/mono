import { memo, useEffect, useState } from 'react'

const InfoPanel = memo(function TopPanel() {
  return (
    <div className="w-full flex items-center justify-between p-4 bg-base-200 rounded-lg shadow-md h-(--game-topbar-height)">
      <Word />
      <Counter />
    </div>
  )
})

export default InfoPanel

interface CounterProps {
  timeLimit: number
  onTimeUp?: () => void
}

const Word = memo(function Word() {
  const word = 'apple'
  const imageUrl = 'https://picsum.photos/200'

  return (
    <InternalWord word={word} imageUrl={imageUrl} />
  )
})

function InternalWord({ word, imageUrl }: { word: string, imageUrl?: string }) {
  return (
    <div className="flex gap-2 items-center">
      {imageUrl && (
        <div className="relative rounded-lg overflow-hidden">
          <img src={imageUrl} alt={word} className="object-cover w-12 h-12" />
        </div>
      )}
      <div>
        <p className="text-xs text-fore-300">Draw</p>
        <p className="text-2xl text-fore-400">{word}</p>
      </div>
    </div>
  )
}

const Counter = memo(function Counter() {
  const timeLimit = 60
  const onTimeUp = () => {
    console.log('Time up!')
  }

  return (
    <InternalCounter timeLimit={timeLimit} onTimeUp={onTimeUp} />
  )
})

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
    <div className="text-2xl">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  )
}
