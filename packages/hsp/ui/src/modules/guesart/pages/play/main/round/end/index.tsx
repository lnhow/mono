import { useAtomValue } from 'jotai'
import { memo, useEffect, useMemo } from 'react'
import { useCountdown } from 'usehooks-ts'
import Container from '../../../_components/Container'
import WordBox from '../../../_components/WordBox'
import { roomRoundAtom, type TGameState } from '../../../_state/store'

const RoundEnd = memo(function RoundEnd() {
  const round = useAtomValue(roomRoundAtom)
  const isFinalRound = round.isLastRound

  return (
    <RoundEndInternal
      word={round.word}
      wordImg={round.wordImg}
      isFinalRound={isFinalRound}
    />
  )
})
export default RoundEnd

const RoundEndInternal = ({
  word,
  wordImg,
  isFinalRound,
}: Pick<TGameState['round'], 'word' | 'wordImg'> & {
  isFinalRound: boolean
}) => {
  return (
    <Container className="bg-base-200 rounded-lg justify-center">
      <div className="bg-base-300 rounded-lg shadow-lg p-4 md:p-8 max-w-lg w-full text-center">
        <WordBox
          word={word}
          wordImg={wordImg}
          title="The word is"
          className="mb-8"
        />
        <NextRound isLastRound={isFinalRound} />
      </div>
    </Container>
  )
}

type TNextRoundProps = {
  isLastRound: boolean
}

export const NextRound = memo(function NextRound({
  isLastRound,
}: TNextRoundProps) {
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
      controller.stopCountdown()
    }
  }, [countdown, controller])

  useEffect(() => {
    controller.startCountdown()
    return () => {
      controller.stopCountdown()
    }
  }, [controller])

  return (
    <div className="max-w-full">
      {isLastRound ? (
        <>Finalizing results ({countdown}s)</>
      ) : (
        <>Starting next round in {countdown}s</>
      )}
    </div>
  )
})
