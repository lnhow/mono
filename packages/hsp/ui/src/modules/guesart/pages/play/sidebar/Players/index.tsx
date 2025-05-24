import { Card } from '@hsp/ui/src/components/base/card'
import cn from '@hsp/ui/src/utils/cn'
import { useListenRoomPlayers } from '../../_state/hooks'
import { useAtomValue } from 'jotai'
import { roomPlayersAtom } from '../../_state/store'

export default function PlayersList({ className }: { className?: string }) {
  const players = useAtomValue(roomPlayersAtom)
  useListenRoomPlayers()

  return (
    <Card className={cn('border-b flex flex-col overflow-hidden', className)}>
      <h2 className="text-xs font-semibold text-fore-200 mb-1 px-4 pt-2">Users</h2>
      <ul className="space-y-1 overflow-auto flex-1 px-4 pb-4">
        {players.map((player) => (
          <li
            key={player.userId}
            className="text-sm text-fore-400 flex justify-between"
          >
            <span>{player.userName}</span>
            <span className="text-fore-500 font-semibold">{player.score}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
