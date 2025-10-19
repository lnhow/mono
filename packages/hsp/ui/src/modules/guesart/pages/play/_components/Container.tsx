import cn from '@hsp/ui/utils/cn'
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
        'flex flex-col items-center w-full h-full min-h-[33vh] md:h-(--layout-full-height) relative gap-2',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default memo(Container)
