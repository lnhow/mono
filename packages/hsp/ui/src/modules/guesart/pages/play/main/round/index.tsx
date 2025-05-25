import { memo } from 'react'
import Canvas from './play/Canvas'
import RoundStart from './start'
import RoundEnd from './end'

const RoomRound = memo(function RoomRound() {

  return <RoundEnd />
  return <RoundStart />
  return <Canvas />
})

export default RoomRound
