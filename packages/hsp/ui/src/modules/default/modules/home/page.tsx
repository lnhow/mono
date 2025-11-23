import CardDemo from './DemoCard'
import { LOBBY_URL as GUESART_LOBBY_URL } from '../../../guesart/utils'

export default function CardsDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {demos.map((demo) => (
        <CardDemo
          key={demo.id}
          title={demo.title}
          description={demo.description}
          href={demo.href}
          external={demo.external}
          className={demo.wide ? 'sm:col-span-2 lg:col-span-2' : ''}
          transitionCard={`${demo.id}-card`}
          transitionTitle={`${demo.id}-title`}
          transitionDescription={`${demo.id}-description`}
        />
      ))}
    </div>
  )
}

const demos = [
  {
    id: 'guesart',
    title: 'guesart',
    description: 'A draw and guess game built with Socket.IO.',
    href: GUESART_LOBBY_URL,
    wide: true,
  },
  {
    id: 'nextjs-perf',
    title: 'NextJS Performance',
    description: 'Comparing NextJS 16 current SSR vs the new Suspense + Cache Component.',
    href: '/nextjs-perf',
  },
  {
    id: 'contrast-checker',
    title: 'Contrast checker',
    description: 'A simple contrast checker for web accessibility.',
    href: '/tools/contrast-checker',
  },
  {
    id: 'player',
    title: 'Custom HTML video player',
    description: (
      <>
        Built with <code>useSyncExternalStore</code> and only two{' '}
        <code>useState</code>
      </>
    ),
    href: '/player',
  },
  {
    id: 'spiral',
    title: 'Galaxy Generator',
    description: 'A galaxy spiral generator built with Three.js.',
    href: '/spiral',
  },
  {
    id: 'cake',
    title: 'Happy Birthday Cake',
    description: 'Add your own message to the cake and send it to your friends!',
    href: '/cake?edit=true',
    // TODO: Fix me
    // !IMPORTANT: Open in a new tab to avoid issues with React Three Fiber and Next 16 back/forward incompatibility
    external: true,
  }
]
