import { memo } from 'react'
import { useAtomValue } from 'jotai'
import { Button } from '@hsp/ui/src/components/base/button'
import ButtonCopy from '@hsp/ui/components/common/input/CopyButton'

import { roomMetadataAtom, TGameState } from '../../_state/store'
import { sessionAtom, socketAtom } from '../../../../state/store'
import Container from '../../_components/Container'

import Rules from './Rules'
import ButtonLeaveRoom from '../../_components/ButtonLeaveRoom'
import { ROOM_CONSTRAINTS } from '../../../lobby/group/rooms/RoomCreateForm'
import { ERoomTheme } from '../../../../state/type/room'
import { EClientToServerEvents } from '../../../../state/type/socket'
import { debounce } from 'lodash'
import { DEFAULT_DEBOUNCE_TIME } from '@hsp/ui/src/utils/debounce'

const GameStart = memo(function GameStart() {
  const metaData = useAtomValue(roomMetadataAtom)
  const { socket } = useAtomValue(socketAtom)
  const { userId } = useAtomValue(sessionAtom)
  const isHost = metaData.host.id === userId

  return (
    <GameStartInternal
      metaData={metaData}
      isHost={isHost}
      onStartGame={debounce(() => {
        if (!isHost || !socket) {
          return
        }
        socket.emitWithAck(EClientToServerEvents.GAME_START)
      }, DEFAULT_DEBOUNCE_TIME)}
    />
  )
})

export default GameStart

function GameStartInternal({
  metaData,
  isHost,
  onStartGame,
}: {
  isHost: boolean
  metaData: TGameState['metadata']
  onStartGame: () => void
}) {
  return (
    <Container className="bg-base-200 rounded-lg justify-center">
      <div className="text-sm p-4">
        <span className="text-xs">Room ID</span>
        <div className="flex items-center gap-2">
          <p className="text-lg text-fore-400">{metaData.id}</p>
          <ButtonCopy textToCopy={metaData.id} />
        </div>
        <span className="text-xs">Share with others for them to join</span>
      </div>
      <div className="m-4 flex flex-wrap justify-center max-w-full px-8 gap-2">
        {Object.entries(RoomMetadata).map(([key, value]) => {
          const metadataValue = metaData[key as keyof typeof RoomMetadata]
          const valueTyped = value as (typeof RoomMetadata)[
            | 'theme'
            | 'timePerRoundInSec']

          return (
            <div
              key={key}
              className="flex flex-col justify-center bg-base-300 items-center px-4 py-3 h-full rounded-lg"
            >
              <h6 className="text-xs text-fore-200">{value.label}</h6>
              <span className="text-md text-fore-300 mt-1">
                {valueTyped?.mapper
                  ? valueTyped.mapper(metadataValue)
                  : metadataValue}
              </span>
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap justify-center items-center mt-4 gap-4">
        <ButtonLeaveRoom />
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

export const RoomMetadata = {
  maxUsers: {
    label: 'Players',
  },
  numOfRounds: {
    label: 'Rounds',
  },
  timePerRoundInSec: {
    label: 'Time per round',
    mapper: (value: unknown) => {
      return `${value}s`
    },
  },
  theme: {
    label: 'Theme',
    mapper: (value: unknown) => {
      return (
        ROOM_CONSTRAINTS.THEMES_OPTIONS.find(
          (option) => option.value === (value as ERoomTheme),
        )?.label || 'N/A'
      )
    },
  },
} as const
