import NoSsr from '@hsp/ui/src/components/app/NoSsr'
import { ButtonLink } from '@hsp/ui/src/components/base/button'
import { ThemeToggle } from '@hsp/ui/src/components/theme/ThemeToggle'
import SocketProvider from '../state/SocketProvider'
import { memo } from 'react'
import { JotaiProvider } from '../state/JotaiProvider'

const GuesartLayout = memo(function GuesartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="w-full z-50">
        <nav className="px-4 py-2 h-(--layout-header-height) flex justify-between">
          <ButtonLink variant="ghost" href="/">
            guesart
          </ButtonLink>
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

export default GuesartLayout
