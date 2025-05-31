import cn from '@hsp/ui/src/utils/cn'
import ChatList from './ChatList'
import ChatInput from './ChatInput'

export default function Chat({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col flex-1 overflow-y-auto py-2', className)}>
      <h2 className="text-xs text-fore-200 font-semibold mb-2 px-4">
        Messages
      </h2>
      <ChatList className="space-y-2 mb-4 flex-1 overflow-y-auto px-4" />
      <ChatInput className='px-2' />
    </div>
  )
}
