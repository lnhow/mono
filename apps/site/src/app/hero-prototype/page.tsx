import type { Metadata } from 'next'

import { ScrollRuler } from '@/components/hero/scroll-ruler'
import { UserAgentDisplay } from '@/components/hero/user-agent-display'

import { FuturisticClockLoader } from './futuristic-clock-loader'

export const metadata: Metadata = {
  title: 'Futuristic Hero Prototype',
  robots: { follow: false, index: false },
}

export default function HeroPrototypePage() {
  return (
    <main className="hero-prototype-page">
      <div className="hero-prototype-stage">
        <div className="hero-prototype-user-agent">
          <UserAgentDisplay />
        </div>
        <div className="hero-prototype-clock">
          <FuturisticClockLoader />
        </div>
      </div>
      <ScrollRuler />
    </main>
  )
}
