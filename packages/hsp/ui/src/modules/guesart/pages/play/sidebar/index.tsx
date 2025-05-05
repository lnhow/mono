
import cn from '@hsp/ui/src/utils/cn'
import PlayersList from './Players'
import Chat from './Chat'

export default function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn('h-(--layout-full-height) shadow-md rounded-lg flex flex-col', className)}>
      <PlayersList className='h-56 max-h-5/12' />
      <Chat className='h-[calc(100%-var(--spacing)*56)]' />
    </div>
  )
}
