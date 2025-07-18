import { memo } from 'react'
import ViewTransition from '@hsp/ui/src/components/app/ViewTransition'
import { ButtonLink } from '@hsp/ui/src/components/base/button'
import { ThemeToggle } from '@hsp/ui/src/components/theme/ThemeToggle'
import NoSsr from '@hsp/ui/src/components/app/NoSsr'

import SocketProvider from '../state/SocketProvider'
import { JotaiProvider } from '../state/JotaiProvider'
import { LOBBY_URL } from '../utils'
import { LuHouse } from 'react-icons/lu'

const LayoutGuesart = memo(function LayoutGuesart({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="w-full z-50">
        <nav className="px-4 py-2 h-(--layout-header-height) flex justify-between">
          <div className='flex items-center gap-2'>
            <ButtonLink variant="ghost" size="icon" href="/">
              <LuHouse />
              <span className="sr-only">Home</span>
            </ButtonLink>
            <ViewTransition name="header-title">
              <ButtonLink variant="ghost" href={LOBBY_URL}>
                guesart
              </ButtonLink>
            </ViewTransition>
          </div>
          <ThemeToggle />
        </nav>
      </div>
      <JotaiProvider>
        <main className="mx-(--layout-spacing) mb-(--layout-spacing) min-h-(--layout-full-height)">
          {children}
        </main>
        <NoSsr>
          <SocketProvider />
        </NoSsr>
      </JotaiProvider>
    </div>
  )
})

export default LayoutGuesart
