import { Card } from '@hsp/ui/components/card'
import cn from '@hsp/ui/utils/cn'
import { useListenRoomPlayers } from '../../_state/hooks'
import { useAtomValue } from 'jotai'
import {
  roomMetadataAtom,
  roomPlayersAtom,
  TGameState,
} from '../../_state/store'
import { sessionAtom } from '../../../../state/store'
import { LuMicVocal } from 'react-icons/lu'
import { PlayerDto } from '../../../../state/type/room'
import Tooltip from '@hsp/ui/components/tooltip'

export default function PlayersList({ className }: { className?: string }) {
  const players = useAtomValue(roomPlayersAtom)
  useListenRoomPlayers()

  return <PlayerListInternal className={className} players={players} />
}

export function PlayerListInternal({
  className,
  players,
}: {
  className?: string
  players: TGameState['players']
}) {
  return (
    <Card className={cn('border-b flex flex-col overflow-hidden', className)}>
      <h2 className="text-xs font-semibold text-fore-200 mb-1 px-4 pt-2 flex justify-between">
        <span>Users</span>
        <span>Score</span>
      </h2>
      <ul className="space-y-1 overflow-auto flex-1 px-4 pb-4">
        {players.map((player) => (
          <Player key={player.userId} player={player} />
        ))}
      </ul>
    </Card>
  )
}

function Player({ player }: { player: PlayerDto }) {
  const { userId } = useAtomValue(sessionAtom)
  const { host } = useAtomValue(roomMetadataAtom)
  const isHost = host.id === player.userId
  const isMe = userId === player.userId

  return (
    <li className="text-sm text-fore-400 flex justify-between">
      <div
        className={cn(
          'flex gap-1 items-center',
          isMe ? 'font-bold text-primary-400' : '',
        )}
      >
        <span>{player.userName}</span>
        {isHost && (
          <Tooltip label="Host">
            <LuMicVocal className="text-fore-200" />
          </Tooltip>
        )}
      </div>
      <span className="text-fore-500 font-semibold">{player.score}</span>
    </li>
  )
}
