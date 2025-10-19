import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@hsp/ui/components/collapsible'
import { LuInfo } from 'react-icons/lu'
import cn from '@hsp/ui/utils/cn'
import Link from '@hsp/ui/utils/app/link'
import { Button } from '@hsp/ui/components/button'

export default function PlayerSidebar({
  className = '',
  triggerClassName = '',
  contentClassName = '',
}: {
  className?: string
  triggerClassName?: string
  contentClassName?: string
}) {
  return (
    <Collapsible className={cn('bg-base-200', className)}>
      <CollapsibleTrigger asChild>
        <Button className={triggerClassName} variant="ghost" size="sm">
          <LuInfo />
          About
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(
          'player-sidebar text-xs overflow-y-auto w-full h-full px-4 pt-4 pb-8 space-y-2',
          contentClassName,
        )}
      >
        <h2 className="text-lg mb-2">About</h2>
        <section>
          <h4 className="text-fore-200">Technique used</h4>
          <ul className="space-y-2">
            <li>
              <h6 className="mb-1 text-sm">
                React - <code>useExternalSync</code>
              </h6>
              <p>
                To bypass the traditional React&apos;s way of using{' '}
                <code>useState</code>, then using <code>useEffect</code> to sync
                then player&apos;s state to React&apos;s state.
              </p>
            </li>
            <li>
              <h6 className="mb-1 text-sm">
                <code>Fullsreen API</code>
              </h6>
              <Link
                className="text-primary-300"
                href="https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API"
                target="_blank"
                rel="noopener noreferrer"
              >
                MDN Web Docs - Fullscreen API
              </Link>
              <p>
                This API allows displaying an element in full screen mode, which
                is useful for video players.
              </p>
            </li>
            <li>
              <h6 className="mb-2 text-sm">
                <code>Picture-in-picture API</code>
              </h6>
              <Link
                className="text-primary-300"
                href="https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API"
                target="_blank"
                rel="noopener noreferrer"
              >
                MDN Web Docs - Picture-in-Picture API
              </Link>
              <p>
                This API allows displaying a video in a small window that stays
                on top of other windows.
              </p>
            </li>
          </ul>
        </section>
        <section>
          <h4 className="text-fore-200">Extra credits:</h4>
          <ul className="list-disc list-inside text-xs">
            <li className="w-full">
              <Link
                className="text-primary-300"
                href="https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Audio_and_video_delivery/Video_player_styling_basics"
                target="_blank"
                rel="noopener noreferrer"
              >
                MDN Web Docs - Video Player Styling Basics
              </Link>
            </li>
            <li className="w-full">
              The idea of customizing a HTML video player & its core
              functionality is inspired by{' '}
              <Link
                className="text-primary-300"
                href="https://github.com/WebDevSimplified/youtube-video-player-clone"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub - WebDevSimplified YouTube Video Player Clone
              </Link>
            </li>
            <li className="w-full">
              <Link
                className="text-primary-300"
                href="https://gist.github.com/jsturgis/3b19447b304616f18657"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gist - jsturgis - Sample video
              </Link>
            </li>
          </ul>
        </section>
      </CollapsibleContent>
    </Collapsible>
  )
}
