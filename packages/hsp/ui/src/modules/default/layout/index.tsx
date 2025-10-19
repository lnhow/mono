import ViewTransition from '@hsp/ui/utils/react/view-transition'
import { ButtonLink } from '@hsp/ui/components/button'
import { ThemeToggle } from '@hsp/ui/utils/theme/ThemeToggle'
import { PersonalGithubIcon } from '@hsp/ui/modules/personal/github'

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="w-full z-50 sticky top-0 bg-base-100/95 backdrop-blur supports-backdrop-filter:bg-base-100/30">
        <nav className="px-4 py-2 mx-auto lg:container lg:px-0 h-(--layout-header-height) flex justify-between">
          <ViewTransition name="header-title">
            <ButtonLink variant="ghost" href="/">
              haoln
            </ButtonLink>
          </ViewTransition>
          <div className="flex items-center gap-2">
            <PersonalGithubIcon />
            <ThemeToggle />
          </div>
        </nav>
      </div>
      <main className="mx-(--layout-spacing) mb-(--layout-spacing) min-h-(--layout-full-height)">
        {children}
      </main>
    </div>
  )
}
