import { Metadata } from 'next'
import DemoPlayer from '@hsp/ui/modules/default/modules/player/demo'
import ViewTransition from '@hsp/ui/utils/react/view-transition'

export const metadata: Metadata = {
  title: 'Custom HTML video player - hsp',
  description: 'This is the player page of the application.',
}

export default function PagePlayer() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-12">
      <div className="p-2 mb-6">
        <ViewTransition name="player-title">
          <h1 className="text-2xl sm:text-3xl font-medium text-center text-balance text-zinc-100">
            Custom HTML video player
          </h1>
        </ViewTransition>
        <ViewTransition name="player-description">
          <p className="my-3 text-sm sm:text-base text-zinc-400 text-center text-balance max-w-md mx-auto">
            With custom controls, styling, only native browser code.
          </p>
        </ViewTransition>
      </div>
      <ViewTransition name="player-card" update="none">
        <div className="w-full max-w-3xl">
          <DemoPlayer />
        </div>
      </ViewTransition>
    </div>
  )
}
