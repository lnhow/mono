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
      </div>
      {/* <ScrollRuler /> */}
    </main>
  )
}
