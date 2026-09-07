import type { Metadata } from 'next'
import { LucideInfo, LucideNotebookPen } from 'lucide-react'

import { GalaxyHero } from './_components/galaxy-hero'
import {
  BigStageCardLink,
  SmallStageCardLink,
} from './_components/stage-card-link'

export const metadata: Metadata = {
  title: 'Hao Le',
  description: 'Web Developer. Photography and UX Enthusiast.',
}

export default function HomePage() {
  return (
    <main className="galaxy-prototype-page">
      <div className="galaxy-prototype-stage relative">
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
    </main>
  )
}
