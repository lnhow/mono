'use client'
import { Slider } from '@hsp/ui/src/components/base/slider'
import cn from '@hsp/ui/src/utils/cn'
import { ComponentPropsWithoutRef, useRef } from 'react'
import { ButtonPlayback } from './controls/playback'
import { ButtonFullscreen } from './controls/fullscreen'
import { PlayerButton } from './_base/button'
import { LuCaptions, LuSettings, LuSubscript, LuVolume2 } from 'react-icons/lu'

export type HspPlayerProps = {
  sources?: string[]
  autoPlay?: boolean
  className?: string
  slot?: {
    container?: Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>
    // video?: Omit<ComponentPropsWithoutRef<'video'>, 'src' | 'controls'>
  }
}

export default function HspPlayer({
  sources,
  className,
  slot,
}: HspPlayerProps) {
  const propsContainer = slot?.container || {}
  const refContainer = useRef<HTMLDivElement>(null)
  const refVideo = useRef<HTMLVideoElement>(null)

  const getVideoEl = () => {
    return refVideo.current
  }
  const getContainerEl = () => {
    return refContainer.current
  }

  // useImperativeHandle(
  //   props.ref,
  //   () => ({
  //     current: refVideo.current,
  //     play: () => refVideo.current?.play(),
  //     pause: () => refVideo.current?.pause(),
  //     load: () => refVideo.current?.load(),
  //     requestFullscreen: () => refVideo.current?.requestFullscreen(),
  //   }),
  //   [],
  // )

  return (
    <div
      {...propsContainer}
      className={cn('relative overflow-hidden', className)}
      ref={refContainer}
    >
      <video ref={refVideo} className="w-full h-full">
        {sources?.map((src, index) => (
          <source key={index} src={src} type="video/mp4" />
        ))}
        Your browser does not support the video tag.
      </video>
      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm z-10">
        <Slider />
        <div className="flex justify-between gap-2">
          <div className="flex items-center">
            <ButtonPlayback getVideoEl={getVideoEl} />
            <div className='mx-2 text-xs'>
              <span className="current">0:00</span>
              <span className="separator">{' / '}</span>
              <span className="duration">0:00</span>
            </div>
          </div>
          <div className="flex items-center">
            <PlayerButton>
              <LuCaptions />
            </PlayerButton>
            <PlayerButton>
              <LuVolume2 />
            </PlayerButton>
            <PlayerButton>
              <LuSettings />
            </PlayerButton>
            <ButtonFullscreen getContainerEl={getContainerEl} />
          </div>
        </div>
      </div>
    </div>
  )
}




