import CardDemo from '@hsp/ui/components/app/card/demo'
import { LOBBY_URL as GUESART_LOBBY_URL } from '../../../guesart/utils'

export default function CardsDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardDemo
        title="guesart"
        description="A draw and guess game built with Socket.IO."
        href={GUESART_LOBBY_URL}
        className="grid-span-1 sm:col-span-2 lg:col-span-2"
        transitionCard="guesart-card"
        transitionTitle="guesart-title"
      />
      <CardDemo
        title="Custom HTML video player"
        description={
          <>
            Built with <code>useSyncExternalStore</code> and only two{' '}
            <code>useState</code>
          </>
        }
        href="/player"
        transitionCard="player-card"
        transitionTitle="player-title"
        transitionDescription="player-description"
      />
      <CardDemo
        title="Contrast checker"
        description="A simple contrast checker for web accessibility."
        href="/tools/contrast-checker"
        transitionCard="contrast-checker-card"
        transitionTitle="contrast-checker-title"
      />
    </div>
  )
}
