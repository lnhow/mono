'use cache'

import { Suspense, ViewTransition } from 'react'
import { Metadata } from 'next'
import PagePlay from '@hsp/ui/modules/guesart/pages/play'
import RoomSkeleton from '@hsp/ui/modules/guesart/pages/play/skeleton'

export const metadata: Metadata = {
  title: 'Play - guesart',
  description: 'Play - A draw and guess game',
}

export default async function PageIndex() {
  return (
    <ViewTransition name="guesart-card">
      <Suspense fallback={<RoomSkeleton />}>
        <PagePlay />
      </Suspense>
    </ViewTransition>
  )
}
