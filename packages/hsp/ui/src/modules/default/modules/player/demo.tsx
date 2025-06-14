import HspPlayer from './components/player/player'
import { SAMPLE } from './const'

const sampleVideo = SAMPLE.videos[0]

export default function DemoPlayer() {
  return (
    <HspPlayer
      sources={[...sampleVideo.sources]}
      className="w-full rounded-md"
    />
  )
}
