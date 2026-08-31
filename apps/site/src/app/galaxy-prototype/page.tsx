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
        <section className="max-w-3xl px-4 sm:px-2 w-full space-y-6 py-12 z-10 absolute top-0 right-0 h-full flex flex-col items-start justify-center">
          <div className="bg-linear-to-r from-neutral-900/30 to-neutral-900/0 rounded-3xl p-6 transform-gpu backdrop-blur-xs overflow-hidden">
            <h1 className="tracking-wide text-5xl text-neutral-50">
              <span className="text-neutral-400 text-3xl font-bold">Hi,</span>
              <br /> I&apos;m Hào
            </h1>
            <p className="text-sm text-neutral-600 sm:text-md">
              Web Developer. Photography and UX Enthusiast.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            <PersonalGithub />
            <PersonalLinkedinLink />
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
      variant="outline"
      className="dark text-neutral-100"
    >
      <span>GitHub</span>
    </ButtonLink>
  )
}

function PersonalLinkedinLink() {
  return (
    <ButtonLink
      href="https://linkedin.com/in/nguyenhaole7f8/"
      target="_blank"
      variant="outline"
      className="dark text-neutral-100"
    >
      <span>LinkedIn</span>
    </ButtonLink>
  )
}
