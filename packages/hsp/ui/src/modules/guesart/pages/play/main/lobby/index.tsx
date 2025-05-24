import { memo } from 'react'
import { useAtomValue } from 'jotai'
import { Button, ButtonLink } from '@hsp/ui/src/components/base/button'
import ButtonCopy from '@hsp/ui/components/common/input/CopyButton'

import { roomMetadataAtom } from '../../_state/store'
import { sessionAtom } from '../../../../state/store'
import Container from '../../_components/Container'
import { LOBBY_URL } from '../../../../utils'

import Rules from './Rules'

const Lobby = memo(function Lobby() {
  const { host, id: roomId } = useAtomValue(roomMetadataAtom)
  const { userId } = useAtomValue(sessionAtom)
  console.log(
    '\x1B[35m[Dev log]\x1B[0m -> Lobby -> host:',
    host.id,
    userId,
    host.id === userId,
  )
  const isHost = host.id === userId

  return (
    <InternalLobby roomId={roomId} isHost={isHost} onStartGame={() => {}} />
  )
})

export default Lobby

interface InternalLobbyProps {
  roomId: string
  isHost: boolean
  onStartGame: () => void
}

function InternalLobby({ roomId, isHost, onStartGame }: InternalLobbyProps) {
  return (
    <Container className="bg-base-200 rounded-lg justify-center">
      {/* Room Header */}
      <div className="text-sm p-4">
        <span className="text-xs">Room ID</span>
        <div className="flex items-center gap-2">
          <p className="text-lg text-fore-400">{roomId}</p>
          <ButtonCopy textToCopy={roomId} />
        </div>
        <span className="text-xs">Share with others for them to join</span>
      </div>

      <div className="flex flex-wrap justify-center items-center mt-4 gap-4">
        <ButtonLink href={LOBBY_URL} variant="destructive">
          Leave Room
        </ButtonLink>
        {/* Start Game Button (Host Only) */}
        {isHost && (
          <Button onClick={onStartGame} variant="primary">
            Start Game
          </Button>
        )}
      </div>

      <Rules />
    </Container>
  )
}
