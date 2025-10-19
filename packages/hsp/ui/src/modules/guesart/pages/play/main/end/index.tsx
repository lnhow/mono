import { memo } from 'react'
import { PlayerListInternal } from '../../sidebar/Players'
import Container from '../../_components/Container'
import { useAtomValue } from 'jotai'
import { roomPlayersAtom } from '../../_state/store'
import { Card } from '@hsp/ui/components/base/card'
import ButtonLeaveRoom from '../../_components/ButtonLeaveRoom'

const GameEnd = memo(function GameEnd() {
  const players = useAtomValue(roomPlayersAtom)

  return (
    <Container className="bg-base-200 rounded-lg justify-center">
      <Card className="bg-base-300 p-4 md:p-8 max-w-lg w-full text-center">
        <h2 className="text-xl text-fore-300 mb-8">Game ended</h2>
        <PlayerListInternal players={players} />
        <div className="flex flex-wrap justify-center items-center mt-8 gap-4">
          <ButtonLeaveRoom />
        </div>
      </Card>
    </Container>
  )
})
export default GameEnd
