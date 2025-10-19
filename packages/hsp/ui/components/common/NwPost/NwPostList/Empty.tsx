import { MdOutlineInventory2 } from 'react-icons/md'
import classNames from '@hsp/ui/utils/classNames'
import { WithClassName } from '@hsp/ui/src/utils/react/types'

export default function NwEmptyList({
  title = 'No results found',
  className,
}: WithClassName & { title?: string }) {
  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-center',
        className
      )}
    >
      <MdOutlineInventory2 className="w-20 h-20 text-neutral-content" />
      <div className="text-neutral-content text-sm mt-4">{title}</div>
    </div>
  )
}
