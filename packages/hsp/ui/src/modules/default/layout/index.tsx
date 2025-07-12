import ViewTransition from '@hsp/ui/src/components/app/ViewTransition'
import { ButtonLink } from '@hsp/ui/src/components/base/button'
import { ThemeToggle } from '@hsp/ui/src/components/theme/ThemeToggle'
import PersonalGithubLink from './components/github-link'

export default function LayoutDefault({
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
              haoln
            </ButtonLink>
          </ViewTransition>
          <div className='flex items-center gap-2'>
            <PersonalGithubLink />
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
