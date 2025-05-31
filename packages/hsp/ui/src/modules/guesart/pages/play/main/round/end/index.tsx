import { memo, useEffect, useMemo } from 'react'
import {
  roomRoundAtom,
  TGameState,
} from '../../../_state/store'
import Container from '../../../_components/Container'
import { useCountdown } from 'usehooks-ts'
import WordBox from '../../../_components/WordBox'
import { useAtomValue } from 'jotai'

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
