import { Card } from '@hsp/ui/src/components/base/card'
import { Player } from '../type'
import cn from '@hsp/ui/src/utils/cn'

const initialUsers: Player[] = [
  { name: 'Alice', score: 10 },
  { name: 'Bob', score: 8 },
  { name: 'Charlie', score: 12 },
  { name: 'Diana', score: 5 },
]

export default function PlayersList({ className }: { className?: string }) {
  return (
    <Card className={cn('border-b flex flex-col overflow-hidden', className)}>
      <h2 className="text-xs font-semibold text-fore-200 mb-1 px-4 pt-4">Users</h2>
      <ul className="space-y-1 overflow-auto flex-1 px-4 pb-4">
        {initialUsers.map((user, index) => (
          <li
            key={index}
            className="text-sm text-fore-400 flex justify-between"
          >
            <span>{user.name}</span>
            <span className="text-fore-500 font-semibold">{user.score}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
