import { Metadata } from 'next'
import DemoPlayer from '@hsp/ui/src/modules/default/modules/player/demo'
import ViewTransition from '@hsp/ui/src/components/app/ViewTransition'

export const metadata: Metadata = {
  title: 'Custom HTML video player - hsp',
  description: 'This is the player page of the application.',
}

export default function PagePlayer() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ViewTransition name="player-demo-title">
        <h1 className="text-2xl font-medium">Custom HTML video player</h1>
      </ViewTransition>
      <ViewTransition name="player-demo-description">
        <p className="my-4 text-lg">
          With custom controls, styling, only native browser code.
        </p>
      </ViewTransition>
      <DemoPlayer />
    </div>
  )
}
