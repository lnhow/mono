import { Metadata } from 'next'
import DemoPlayer from '@hsp/ui/src/modules/default/modules/player/demo'
import { ButtonLink } from '@hsp/ui/src/components/base/button'

export const metadata: Metadata = {
  title: 'Custom HTML video player - hsp',
  description: 'This is the player page of the application.',
}

export default function PagePlayer() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-medium">Custom HTML video player</h1>
      <p className="my-4 text-lg">
        With custom controls, styling, only native browser code.
      </p>
      <DemoPlayer />
      <section className="my-4 text-center">
        <p>Extra credits:</p>
        <ul className="mt-2">
          <li className='w-full'>
            <ButtonLink
              className='w-full'
              variant="ghost"
              href="https://github.com/WebDevSimplified/youtube-video-player-clone"
              target="_blank"
              rel="noopener noreferrer"
            >
              WebDevSimplified YouTube Video Player Clone
            </ButtonLink>
          </li>
          <li className='w-full'>
            <ButtonLink
              className='w-full'
              variant="ghost"
              href="https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Audio_and_video_delivery/Video_player_styling_basics"
              target="_blank"
              rel="noopener noreferrer"
            >
              MDN Web Docs - Video Player Styling Basics
            </ButtonLink>
          </li>
        </ul>
      </section>
    </div>
  )
}
