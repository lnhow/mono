import { useAtomValue } from 'jotai'
import { memo } from 'react'
import { ERoomStatus } from '../../../../state/type/room'
import { roundStatusAtom } from '../../_state/store'
import RoundEnd from './end'
import RoundPlay from './play'
import RoundStart from './start'

const GameRound = memo(function GameRound() {
  const roundStatus = useAtomValue(roundStatusAtom)

  if (roundStatus === ERoomStatus.finished) {
    return <RoundEnd />
  }

  if (roundStatus === ERoomStatus.playing) {
    return <RoundPlay />
  }

  return <RoundStart />
})

export default GameRound
