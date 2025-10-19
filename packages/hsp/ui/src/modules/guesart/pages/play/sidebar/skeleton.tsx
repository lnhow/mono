import { Skeleton } from '@hsp/ui/components/skeleton'
import cn from '@hsp/ui/utils/cn'

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
