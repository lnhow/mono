import { memo } from 'react'
import ViewTransition from '@hsp/ui/src/components/app/ViewTransition'
import { ButtonLink } from '@hsp/ui/src/components/base/button'
import { ThemeToggle } from '@hsp/ui/src/components/theme/ThemeToggle'
import NoSsr from '@hsp/ui/src/components/app/NoSsr'

import SocketProvider from '../state/SocketProvider'
import { JotaiProvider } from '../state/JotaiProvider'

const LayoutGuesart = memo(function LayoutGuesart({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="w-full z-50">
        <nav className="px-4 py-2 h-(--layout-header-height) flex justify-between">
          <ViewTransition name="header-title">
            <ButtonLink variant="ghost" href="/">
              guesart
            </ButtonLink>
          </ViewTransition>
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
