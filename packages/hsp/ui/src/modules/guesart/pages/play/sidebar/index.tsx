import cn from '@hsp/ui/src/utils/cn'
import PlayersList from './Players'
import Chat from './Chat'

export default function Sidebar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'md:h-(--layout-full-height) shadow-md rounded-lg md:flex md:flex-col',
        className,
      )}
    >
      <Chat className="h-56 md:h-[calc(100%-var(--spacing)*56)] md:order-1" />
      <PlayersList className="h-56 md:max-h-5/12" />
    </div>
  )
}
