import PageLobby from '@hsp/ui/src/modules/guesart/pages/lobby'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'guesArt',
  description: 'guesArt',
}

export default function PageIndex() {
  return <PageLobby />
}
