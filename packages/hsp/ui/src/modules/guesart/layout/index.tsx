import { ButtonLink } from '@hsp/ui/src/components/base/button'
import { ThemeToggle } from '@hsp/ui/src/components/theme/ThemeToggle'

export default function GuesartLayout({
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
      <main className="mx-4 mb-4 bg-base-200 min-h-[calc(100vh-var(--layout-header-height)---spacing(4))]">
        {children}
      </main>
    </div>
  )
}
