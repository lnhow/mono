import { Skeleton } from '@hsp/ui/src/components/base/skeleton'
import cn from '@hsp/ui/src/utils/cn'

export default function SidebarSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={cn(
        'md:h-(--layout-full-height) shadow-md rounded-lg md:flex md:flex-col',
        className,
      )}
    />
  )
}
