import { memo } from 'react'
import RoundPlay from './play'
import RoundStart from './start'
import RoundEnd from './end'

const GameRound = memo(function GameRound() {

  return <RoundStart />
  return <RoundPlay />
  return <RoundEnd />
})

export default GameRound
