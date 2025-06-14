import HspPlayer from './components/player/player'
import { SAMPLE } from './const'

const sampleVideo = SAMPLE.videos[0]

export default function DemoPlayer() {
  return (
    <HspPlayer
      sources={[...sampleVideo.sources]}
      tracks={[...sampleVideo.track]}
      poster={SAMPLE.thumbPrefix + sampleVideo.thumb}
      className="w-full rounded-md aspect-video"
    />
  )
}
