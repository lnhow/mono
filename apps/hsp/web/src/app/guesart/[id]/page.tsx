import PagePlay from '@hsp/ui/src/modules/guesart/pages/play'
import { Metadata } from 'next'
import ViewTransition from '@hsp/ui/src/components/app/ViewTransition'

export const metadata: Metadata = {
  title: 'Play - guesart',
  description: 'Play - A draw and guess game',
}

export default function PageIndex() {
  return (
    <ViewTransition name="guesart-card">
      <PagePlay />
    </ViewTransition>
  )
}
