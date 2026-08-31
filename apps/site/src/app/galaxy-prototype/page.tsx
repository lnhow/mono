import type { Metadata } from 'next'

// import { ScrollRuler } from '@/components/hero/scroll-ruler'
// import { UserAgentDisplay } from '@/components/hero/user-agent-display'
import { GalaxyHero } from '@/components/hero/galaxy-hero'

export const metadata: Metadata = {
  title: 'Galaxy Hero Prototype',
  robots: { follow: false, index: false },
}

export default function GalaxyPrototypePage() {
  return (
    <main className="galaxy-prototype-page">
      <div className="galaxy-prototype-stage relative">
        {/* <div className="galaxy-prototype-user-agent absolute top-4 left-4 z-50 mix-blend-difference pointer-events-auto">
          <UserAgentDisplay />
        </div> */}
        <div className="h-full w-full">
          <GalaxyHero />
        </div>
        <section className="max-w-3xl px-4 sm:px-2 w-full space-y-6 py-12 z-10 absolute top-0 right-0 h-full flex flex-col items-start justify-center">
          {/* <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            {portfolio.eyebrow}
          </p> */}
          <h1 className="tracking-wide text-4xl sm:text-6xl text-gray-200">
            <span className="text-gray-400 text-6xl font-bold">Hi,</span>
            <br /> I&apos;m Hào
          </h1>
          <p className="text-lg text-gray-400 sm:text-xl">
            Web Developer. Photography and UX Enthusiast.
          </p>
        </section>
      </div>
      {/* <ScrollRuler /> */}
    </main>
  )
}
