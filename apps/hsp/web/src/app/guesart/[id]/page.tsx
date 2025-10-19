import PagePlay from '@hsp/ui/modules/guesart/pages/play'
import { Metadata } from 'next'
import ViewTransition from '@hsp/ui/utils/react/view-transition'

// Force static generation for this page
// [id] is the room id. but only used on the client side
// so we can force static generation here
export const dynamic = 'force-static'

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
