import { memo } from 'react'

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center w-full md:h-(--room-game-top-bar-height) relative gap-2">
      {children}
    </div>
  )
}

export default memo(Container)
