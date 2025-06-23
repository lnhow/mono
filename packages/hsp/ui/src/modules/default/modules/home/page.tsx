import CardDemo from '@hsp/ui/src/components/app/card/demo'
import { LOBBY_URL as GUESART_LOBBY_URL } from '../../../guesart/utils'

export default function BaseHomePage() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Welcome to Hammerspace</h1>
      <p>Below is a collection of demo & experiment.</p>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardDemo
          title="guesart"
          description="A draw and guess game build with Socket.IO."
          href={GUESART_LOBBY_URL}
          transitionCard="guesart-card"
          transitionTitle="guesart-title"
        />
        <CardDemo
          title="Custom HTML video player"
          description={<>Built with <code>useSyncExternalStore</code> and only one <code>useState</code></>}
          href="/player"
          transitionCard="player"
          transitionTitle="player-demo-title"
          transitionDescription="player-demo-description"
        />
      </div>
    </div>
  )
}
