import cn from '@hsp/ui/utils/cn'
import type { WithClassName } from '@hsp/ui/utils/react/types'
import { MdOutlineInventory2 } from 'react-icons/md'

export default function NwEmptyList({
  title = 'No results found',
  className,
}: WithClassName & { title?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <MdOutlineInventory2 className="w-20 h-20 text-neutral-content" />
      <div className="text-neutral-content text-sm mt-4">{title}</div>
    </div>
  )
}
