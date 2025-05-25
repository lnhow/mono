import { memo, useEffect, useMemo } from 'react'
import { TGameState } from '../../../_state/store'
import Container from '../../../_components/Container'
import { useCountdown } from 'usehooks-ts'
import WordBox from '../../../_components/WordBox'

const RoundEnd = memo(function RoundEnd() {
  const word = 'apple'
  const wordImg = 'https://picsum.photos/300'
  return <RoundEndInternal word={word} wordImg={wordImg} />
})
export default RoundEnd

const RoundEndInternal = ({
  word,
  wordImg,
}: Pick<TGameState['round'], 'word' | 'wordImg'>) => {
  return (
    <Container className="bg-base-200 rounded-lg justify-center">
      <div className="bg-base-300 rounded-lg shadow-lg p-4 md:p-8 max-w-lg w-full text-center">
        <WordBox word={word} wordImg={wordImg} title="The word is" className="mb-8" />
        <NextRound onStart={() => {}} />
      </div>
    </Container>
  )
}

export const NextRound = memo(function NextRound({
  onStart,
}: {
  onStart: () => void
}) {
  const [countdown, controller] = useCountdown(
    useMemo(
      () => ({
        countStart: 10,
        countStop: 0,
        intervalMs: 1000,
      }),
      [],
    ),
  )

  useEffect(() => {
    if (countdown === 0) {
      onStart()
    }
  }, [countdown, onStart])

  useEffect(() => {
    controller.startCountdown()
    return () => {
      controller.stopCountdown()
    }
  }, [controller])

  return (
    <div onClick={onStart} className="max-w-full">
      Starting next round in <span>{countdown}s</span>
    </div>
  )
})
