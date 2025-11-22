import PagePlay from '@hsp/ui/modules/guesart/pages/play'
import { Metadata } from 'next'
import ViewTransition from '@hsp/ui/utils/react/view-transition'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Play - guesart',
  description: 'Play - A draw and guess game',
}

export default function PageIndex() {
  return (
    <Suspense>
      <ViewTransition name="guesart-card">
        <PagePlay />
      </ViewTransition>
    </Suspense>
  )
}
