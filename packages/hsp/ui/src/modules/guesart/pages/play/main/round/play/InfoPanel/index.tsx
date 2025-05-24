import { memo } from 'react'
import { Counter } from './counter'
import { Word } from './word'

const InfoPanel = memo(function TopPanel() {
  return (
    <div className="w-full flex items-center justify-between bg-base-200 rounded-lg shadow-md h-(--game-topbar-height)">
      <Word />
      <Counter />
    </div>
  )
})

export default InfoPanel
