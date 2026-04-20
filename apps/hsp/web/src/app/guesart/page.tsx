import PageLobby from '@hsp/ui/modules/guesart/pages/lobby'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'guesart',
  description: 'A draw and guess game',
}

export default function PageIndex() {
  return <PageLobby />
}
