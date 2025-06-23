import ViewTransition from '@hsp/ui/src/components/app/ViewTransition'
import HspPlayer from './components/player/player'
import { SAMPLE } from './const'

const sampleVideo = SAMPLE.videos[0]

export default function DemoPlayer() {
  return (
    <ViewTransition name="player">
      <HspPlayer
        sources={[...sampleVideo.sources]}
        tracks={[...sampleVideo.track]}
        poster={SAMPLE.thumbPrefix + sampleVideo.thumb}
        className='w-full max-w-3xl rounded-md aspect-video'
      />
    </ViewTransition>
  )
}
