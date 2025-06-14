import { Metadata } from 'next'
import DemoPlayer from '@hsp/ui/src/modules/default/modules/player/demo'

export const metadata: Metadata = {
  title: 'Custom HTML video player - hsp',
  description: 'This is the player page of the application.',
}

export default function PagePlayer() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Custom HTML video player</h1>
      <p className="mt-4 text-lg">With custom controls, styling, only native browser code.</p>
      <DemoPlayer />
    </div>
  )
}
