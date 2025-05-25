import { ComponentProps, memo, useEffect, useMemo } from 'react'
import Container from '../../../_components/Container'
import { Button } from '@hsp/ui/src/components/base/button'
import { useCountdown } from 'usehooks-ts'
import WordBox from '../../../_components/WordBox'
import { useAtomValue } from 'jotai'
import { roomRoundAtom } from '../../../_state/store'
import { socketAtom } from '@hsp/ui/src/modules/guesart/state/store'
import { EClientToServerEvents } from '@hsp/ui/src/modules/guesart/state/type/socket'

export const RoundStartDrawer = memo(function RoundStartDrawer() {
  const round = useAtomValue(roomRoundAtom)
  const { socket } = useAtomValue(socketAtom)

  return (
    <RoundStartDrawerInternal
      word={round.word}
      wordImg={round.wordImg}
      onStart={() => {
        socket?.emit(EClientToServerEvents.ROUND_START)
      }}
    />
  )
})

interface DrawerViewProps extends ComponentProps<typeof RoundStartButton> {
  word: string
  wordImg: string
}

export const RoundStartDrawerInternal = memo(function DrawerView({
  word,
  wordImg: wordImg,
  onStart,
}: DrawerViewProps) {
  return (
    <Container className="bg-base-200 rounded-lg justify-center">
      <div className="bg-base-300 rounded-lg shadow-lg p-4 md:p-8 max-w-lg w-full text-center">
        <WordBox word={word} wordImg={wordImg} title="Draw" className="mb-8" />
        <RoundStartButton onStart={onStart} />
      </div>
    </Container>
  )
})

export const RoundStartButton = memo(function RoundStartButton({
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
    <Button
      onClick={onStart}
      size="lg"
      variant="primary"
      className="max-w-full"
    >
      Start Drawing <span>({countdown}s)</span>
    </Button>
  )
})
