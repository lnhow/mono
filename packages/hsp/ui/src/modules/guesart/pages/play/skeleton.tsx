import { Skeleton } from '@hsp/ui/src/components/base/skeleton'
import SidebarSkeleton from './sidebar/skeleton'

export default function RoomSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <Skeleton className="w-full md:h-(--layout-full-height)" />
      <SidebarSkeleton className="w-full md:w-[360px] md:max-w-4/12" />
    </div>
  )
}
