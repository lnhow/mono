import HspPlayer from './components/player/player'
import { SAMPLE } from './const'

const sampleVideo = SAMPLE.videos[0]

export default function DemoPlayer() {
  return <HspPlayer src={sampleVideo.sources[0]} className="w-full" controls />
}
