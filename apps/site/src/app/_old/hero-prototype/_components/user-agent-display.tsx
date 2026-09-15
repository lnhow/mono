'use client'

import { Skeleton } from '@folio/ui/components/skeleton'
import { useEffect, useState } from 'react'

function UserAgentSkeleton() {
  return (
    <div
      aria-label="Loading browser user agent"
      className="w-full max-w-xl space-y-2"
    >
      <Skeleton className="h-4 w-full bg-neutral-900" />
      <Skeleton className="h-4 w-[92%] bg-neutral-900" />
      <Skeleton className="h-4 w-[68%] bg-neutral-900" />
    </div>
  )
}

export function UserAgentDisplay() {
  const [userAgent, setUserAgent] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    queueMicrotask(() => {
      if (!active) return

      try {
        const value = navigator.userAgent.trim()
        if (value) setUserAgent(value)
      } catch {
        // The skeleton is the intentional fault fallback.
      }
    })

    return () => {
      active = false
    }
  }, [])

  if (!userAgent) return <UserAgentSkeleton />

  return (
    <output
      aria-label="Browser user agent"
      className="block max-w-xl font-mono text-[0.625rem] leading-tight text-neutral-900"
    >
      {userAgent}
    </output>
  )
}
