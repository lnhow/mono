import { cn } from '@folio/ui/lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'

// import { UserAgentDisplay } from '@/components/hero/user-agent-display'
import { GalaxyHero } from '@/components/hero/galaxy-hero'
import {
  LucideIcon,
  LucideInfo,
  LucideMoveUpRight,
  LucideNotebookPen,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Galaxy Hero Prototype',
  robots: { follow: false, index: false },
}

const STAGE_PANEL_CLASS =
  'rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md shadow-sm'

export default function GalaxyPrototypePage() {
  return (
    <main className="galaxy-prototype-page">
      <div className="galaxy-prototype-stage relative">
        {/* <div className="galaxy-prototype-user-agent absolute top-4 right-4 text-right z-50 mix-blend-difference pointer-events-auto">
          <UserAgentDisplay />
        </div> */}
        <div className="h-full w-full">
          <GalaxyHero />
        </div>
        <section className="max-w-3xl px-6 sm:px-8 w-full z-10 absolute top-0 right-0 h-full flex flex-col items-start justify-end pb-16 md:pb-18">
          <div className="w-full mx-auto sm:max-w-md space-y-3">
            {/* Header */}
            <div className="space-y-1.5">
              <h1 className="tracking-wide text-3xl sm:text-4xl font-bold text-zinc-300 leading-tight">
                <span className="text-zinc-400 text-lg sm:text-xl font-normal">
                  Hi,
                </span>
                <br /> I&apos;m{' '}
                <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                  Hào
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Web Developer. Photography and UX Enthusiast.
              </p>
            </div>

            {/* Action Row: About + Blog + Socials column */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 items-stretch w-full">
              <BigStageCardLink
                href="/about"
                className="flex-1"
                icon={LucideInfo}
                iconClassName="group-hover:text-primary"
              >
                About
              </BigStageCardLink>
              <BigStageCardLink
                href="/blog"
                className="flex-1"
                icon={LucideNotebookPen}
                iconClassName="group-hover:text-accent"
              >
                Blog
              </BigStageCardLink>
              <div className="flex flex-col justify-between gap-1.5 sm:gap-2 flex-2 min-w-23.75">
                <SmallStageCardLink href="https://github.com/lnhow">
                  GitHub
                </SmallStageCardLink>
                <SmallStageCardLink href="https://linkedin.com/in/nguyenhaole7f8/">
                  LinkedIn
                </SmallStageCardLink>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <ScrollRuler /> */}
    </main>
  )
}

interface StageCardLinkProps extends React.ComponentProps<typeof Link> {
  isExternal?: boolean
}

function StageCardLink({
  className,
  isExternal,
  children,
  href,
  ...props
}: StageCardLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        STAGE_PANEL_CLASS,
        'group relative transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800/80',
        className,
      )}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </Link>
  )
}

function BigStageCardLink({
  children,
  className,
  href,
  icon: Icon,
  iconClassName,
}: {
  children: React.ReactNode
  className?: string
  href: string
  icon: LucideIcon
  iconClassName?: string
}) {
  return (
    <StageCardLink
      href={href}
      className={cn(
        'flex aspect-square flex-col justify-between p-3 sm:p-4 min-w-16',
        className,
      )}
    >
      <div className="flex justify-end">
        <Icon
          size="1.5rem"
          strokeWidth={1.5}
          className={cn(
            'text-zinc-600 transition-[colors,scale] duration-200 group-hover:scale-110',
            iconClassName ?? 'group-hover:text-primary',
          )}
        />
      </div>
      <div>
        <span className="block text-sm sm:text-base font-medium tracking-tight text-zinc-400 group-hover:text-zinc-50 transition-colors">
          {children}
        </span>
      </div>
    </StageCardLink>
  )
}

function SmallStageCardLink({
  children,
  href,
}: {
  children: React.ReactNode
  href: string
}) {
  return (
    <StageCardLink
      href={href}
      isExternal
      className="flex flex-1 items-center justify-between px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-zinc-400"
    >
      <span className="font-medium group-hover:text-zinc-50 transition-colors">
        {children}
      </span>
      <LucideMoveUpRight
        size="1rem"
        strokeWidth={1.5}
        className="text-zinc-600 transition-[transform,translate,color] duration-300 ease-in-out group-hover:text-zinc-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </StageCardLink>
  )
}
