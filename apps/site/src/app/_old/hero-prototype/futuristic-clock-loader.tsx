'use client'

import dynamic from 'next/dynamic'

const FuturisticClock = dynamic(
  () =>
    import('./_components/futuristic-clock').then((module) => module.FuturisticClock),
  {
    loading: () => <div aria-hidden className="hero-clock hero-clock-loading" />,
    ssr: false,
  },
)

export function FuturisticClockLoader() {
  return <FuturisticClock />
}
