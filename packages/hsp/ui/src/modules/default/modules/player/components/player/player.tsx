'use client'
import cn from '@hsp/ui/src/utils/cn'
import { ComponentProps, ComponentPropsWithoutRef, useRef } from 'react'
import { ButtonPlayback } from './controls/playback'
import { ButtonFullscreen } from './controls/fullscreen'
import { DurationIndicator, DurationSlider } from './controls/timeline'
import ButtonPictureInPicture from './controls/pictureinpicture'
import ButtonVolume from './controls/volume'
import ButtonPlayrate from './controls/playrate'
import ButtonSubtitle from './controls/subtitle'

export type TracksProps = Pick<
  ComponentProps<'track'>,
  'kind' | 'label' | 'src' | 'srcLang'
>

export type HspPlayerProps = {
  sources?: string[]
  tracks?: TracksProps[]
  poster?: string
  autoPlay?: boolean
  className?: string
  slot?: {
    container?: Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'className'>
  }
}

export default function HspPlayer({
  sources,
  tracks,
  poster,
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
      <video ref={refVideo} className="w-full h-full" poster={poster}>
        {sources?.map((src, index) => (
          <source key={index} src={src} type="video/mp4" />
        ))}
        {tracks?.map((track, index) => <track key={index} {...track} />)}
        Your browser does not support the video tag.
      </video>
      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-base-100 via-30% via-base-100/60 to-base-100/20 backdrop-blur-sm z-10">
        <DurationSlider getVideoEl={getVideoEl} />
        <div className="flex justify-between gap-2">
          <div className="flex items-center">
            <ButtonPlayback getVideoEl={getVideoEl} />
            <ButtonPlayrate getVideoEl={getVideoEl} />
            <DurationIndicator
              className="mx-2 text-xs"
              getVideoEl={getVideoEl}
            />
          </div>
          <div className="flex items-center">
            <ButtonSubtitle getVideoEl={getVideoEl} />
            <ButtonVolume getVideoEl={getVideoEl} />
            <ButtonPictureInPicture
              getContainerEl={getContainerEl}
              getVideoEl={getVideoEl}
            />
            <ButtonFullscreen getContainerEl={getContainerEl} />
          </div>
        </div>
      </div>
    </div>
  )
}
