import { Skeleton } from '@hsp/ui/components/skeleton'
import { fetchUserData } from '../../../data/api-server'
import { LoginButton, UserInfo } from './client'
import { Button } from '@hsp/ui/components/button'

export async function HeaderUserInfo() {
  // Simulate fetching user data
  const user = await fetchUserData()
  if (!user) {
    return <LoginButton />
  }
  return <UserInfo data={user} />
}

export function UserInfoSkeleton() {
  return (
    <Button size="icon" variant="ghost" aria-label="Loading user info" disabled>
      <Skeleton className="h-6 w-6 rounded-full" />
    </Button>
  )
}
