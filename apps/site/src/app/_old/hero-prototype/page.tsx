import type { Metadata } from 'next'

import { ScrollRuler } from './_components/scroll-ruler'
import { UserAgentDisplay } from './_components/user-agent-display'
import { MechaHero } from './_components/mecha-hero'

export const metadata: Metadata = {
  title: 'Futuristic Hero Prototype',
  robots: { follow: false, index: false },
}

export default function HeroPrototypePage() {
  return (
    <main className="hero-prototype-page">
      <div className="hero-prototype-stage relative">
        <div className="hero-prototype-user-agent absolute top-4 left-4 z-50 mix-blend-difference pointer-events-auto">
          <UserAgentDisplay />
        </div>
        <div className="w-full">
          <MechaHero />
        </div>
      </div>
      <ScrollRuler />
    </main>
  )
}
