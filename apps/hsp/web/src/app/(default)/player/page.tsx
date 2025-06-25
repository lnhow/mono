import { Metadata } from 'next'
import DemoPlayer from '@hsp/ui/src/modules/default/modules/player/demo'
import ViewTransition from '@hsp/ui/src/components/app/ViewTransition'

export const metadata: Metadata = {
  title: 'Custom HTML video player - hsp',
  description: 'This is the player page of the application.',
}

export default function PagePlayer() {
  return (
    <div className="flex min-h-(--layout-full-height) w-full flex-col items-center justify-center">
      <ViewTransition name="player-title">
        <h1 className="text-2xl font-medium text-center text-balance">Custom HTML video player</h1>
      </ViewTransition>
      <ViewTransition name="player-description">
        <p className="my-4 text-md text-fore-200 text-center text-balance">
          With custom controls, styling, only native browser code.
        </p>
      </ViewTransition>
      <ViewTransition name="player-card">
        <DemoPlayer />
      </ViewTransition>
    </div>
  )
}
