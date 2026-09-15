import { Skeleton } from '@hsp/ui/components/skeleton'
import { Button } from '@hsp/ui/components/button'

export function UserInfoSkeleton() {
  return (
    <Button size="icon" variant="ghost" aria-label="Loading user info" disabled>
      <Skeleton className="h-6 w-6 rounded-full" />
    </Button>
  )
}
