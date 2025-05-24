import cn from '@hsp/ui/src/utils/cn'
import { memo } from 'react'

function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center w-full md:h-(--room-game-top-bar-height) relative gap-2',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default memo(Container)
