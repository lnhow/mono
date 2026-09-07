import type { Metadata } from 'next'

import { ScrollRuler } from '@/components/hero/scroll-ruler'
import { UserAgentDisplay } from '@/components/hero/user-agent-display'
import { MechaHero } from '@/components/hero/mecha-hero'

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
