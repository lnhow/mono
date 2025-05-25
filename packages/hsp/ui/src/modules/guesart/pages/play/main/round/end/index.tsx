import { memo, useEffect, useMemo } from 'react'
import { roomRoundAtom, TGameState } from '../../../_state/store'
import Container from '../../../_components/Container'
import { useCountdown } from 'usehooks-ts'
import WordBox from '../../../_components/WordBox'
import { useAtomValue } from 'jotai'
// import { socketAtom } from '@hsp/ui/src/modules/guesart/state/store'
// import { EClientToServerEvents } from '@hsp/ui/src/modules/guesart/state/type/socket'

const RoundEnd = memo(function RoundEnd() {
  const round = useAtomValue(roomRoundAtom)
  return <RoundEndInternal word={round.word} wordImg={round.wordImg} />
})
export default RoundEnd

const RoundEndInternal = ({
  word,
  wordImg,
}: Pick<TGameState['round'], 'word' | 'wordImg'>) => {
  return (
    <Container className="bg-base-200 rounded-lg justify-center">
      <div className="bg-base-300 rounded-lg shadow-lg p-4 md:p-8 max-w-lg w-full text-center">
        <WordBox
          word={word}
          wordImg={wordImg}
          title="The word is"
          className="mb-8"
        />
      </div>
    </Container>
  )
}

export const NextRound = memo(function NextRound() {
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
      console.log('\x1B[35m[Dev log]\x1B[0m -> useEffect -> countdown:', countdown)
    }
  }, [countdown])

  useEffect(() => {
    controller.startCountdown()
    return () => {
      controller.stopCountdown()
    }
  }, [controller])

  return (
    <div className="max-w-full">
      Starting next round in <span>{countdown}s</span>
    </div>
  )
})
