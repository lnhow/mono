'use client'

import dynamic from 'next/dynamic'

const FuturisticClock = dynamic(
  () =>
    import('@/components/hero/futuristic-clock').then((module) => module.FuturisticClock),
  {
    loading: () => <div aria-hidden className="hero-clock hero-clock-loading" />,
    ssr: false,
  },
)

export function FuturisticClockLoader() {
  return <FuturisticClock />
}
