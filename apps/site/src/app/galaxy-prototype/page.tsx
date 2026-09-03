import type { Metadata } from 'next'

import { UserAgentDisplay } from '@/components/hero/user-agent-display'
import { GalaxyHero } from '@/components/hero/galaxy-hero'
import ButtonLink from '@/components/button-link'

export const metadata: Metadata = {
  title: 'Galaxy Hero Prototype',
  robots: { follow: false, index: false },
}

export default function GalaxyPrototypePage() {
  return (
    <main className="galaxy-prototype-page">
      <div className="galaxy-prototype-stage relative">
        <div className="galaxy-prototype-user-agent absolute top-4 right-4 text-right z-50 mix-blend-difference pointer-events-auto">
          <UserAgentDisplay />
        </div>
        <div className="h-full w-full">
          <GalaxyHero />
        </div>
        <section className="max-w-3xl px-6 sm:px-8 w-full space-y-6 py-12 z-10 absolute top-0 right-0 h-full flex flex-col items-start justify-center">
          <div className="relative rounded-3xl p-8 md:p-10 transform-gpu space-y-4 max-w-xl">
            <h1 className="tracking-wide text-4xl sm:text-5xl font-bold text-zinc-300 leading-tight">
              <span className="text-zinc-400 text-xl sm:text-2xl font-normal">
                Hi,
              </span>
              <br /> I&apos;m{' '}
              <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                Hào
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              Web Developer. Photography and UX Enthusiast.
            </p>

            <div className="flex gap-4 flex-wrap pt-2">
              <PersonalGithub />
              <PersonalLinkedinLink />
            </div>
          </div>
        </section>
      </div>
      {/* <ScrollRuler /> */}
    </main>
  )
}

function PersonalGithub() {
  return (
    <ButtonLink
      href="https://github.com/lnhow"
      target="_blank"
      size="lg"
      variant="outline"
      className="dark text-zinc-100 bg-zinc-900/60 shadow-sm"
    >
      <span>GitHub</span>
      <span className="text-xs opacity-60 ml-1">↗</span>
    </ButtonLink>
  )
}

function PersonalLinkedinLink() {
  return (
    <ButtonLink
      href="https://linkedin.com/in/nguyenhaole7f8/"
      target="_blank"
      size="lg"
      variant="outline"
      className="dark text-zinc-100 bg-zinc-900/60 shadow-sm"
    >
      <span>LinkedIn</span>
      <span className="text-xs opacity-60 ml-1">↗</span>
    </ButtonLink>
  )
}
