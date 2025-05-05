import Canvas from './main/round/play/Canvas'
import Sidebar from './sidebar'

export default function PagePlay() {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <Canvas />
      <Sidebar className="w-[360px]" />
    </div>
  )
}
