import { Skeleton } from '@hsp/ui/src/components/base/skeleton'
import SidebarSkeleton from './sidebar/skeleton'

export default function RoomSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <Skeleton className="w-full max-md:pb-[100%] md:h-(--layout-full-height)" />
      <SidebarSkeleton className="w-full max-md:pb-[100%] md:w-[360px] md:max-w-4/12" />
    </div>
  )
}
