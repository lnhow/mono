import { memo } from 'react'
import RoundPlay from './play'
import RoundStart from './start'
import RoundEnd from './end'
import { useAtomValue } from 'jotai'
import { roundStatusAtom } from '../../_state/store'
import { ERoomStatus } from '../../../../state/type/room'

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
