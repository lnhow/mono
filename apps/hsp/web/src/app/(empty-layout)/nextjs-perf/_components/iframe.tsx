'use client'

import { Button, ButtonLink } from '@hsp/ui/components/button'
import cn from '@hsp/ui/utils/cn'
import { useRef } from 'react'
import { LuExternalLink, LuRefreshCcw } from 'react-icons/lu'

export default function ComparisonIframe({
  title,
  src,
  className,
  iframeClassName,
}: {
  title: string
  src: string
  className?: string
  iframeClassName?: string
}) {
  const refIframe = useRef<HTMLIFrameElement>(null)

  return (
    <div className={cn('flex-1 w-full border rounded-t-lg', className)}>
      <div className="flex justify-between items-center space-x-2 pl-2">
        <h2 className="text-fore-300">{title}</h2>
        <div className="flex">
          <ButtonLink
            size="icon"
            variant="ghost"
            aria-label="Open in new tab"
            target="_blank"
            rel="noopener noreferrer"
            href={src}
          >
            <LuExternalLink />
          </ButtonLink>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Refresh Iframe"
            onClick={() => {
              if (!refIframe.current) {
                return
              }
              // eslint-disable-next-line no-self-assign
              refIframe.current.src = refIframe.current.src
            }}
          >
            <LuRefreshCcw />
          </Button>
        </div>
      </div>
      <iframe
        ref={refIframe}
        src={src}
        className={cn(
          'border w-full rounded-lg border-base-300',
          iframeClassName,
        )}
      ></iframe>
    </div>
  )
}
