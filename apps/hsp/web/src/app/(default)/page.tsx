import CardsDemo from '@hsp/ui/src/modules/default/modules/home/page'
import { Metadata } from 'next'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto md:px-4 py-8">
      <section className="mt-[18%]">
        <h1 className="text-4xl">
          <span className="text-fore-200 text-6xl font-bold">Hi,</span>
          <br /> I&apos;m Hao
        </h1>
        <p className="text-xs text-fore-100 mb-4">(Lê Nguyên Hào)</p>
        <h2 className="text-md text-fore-200">
          Web Developer. Photography and UX Enthusiast.
        </h2>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl mb-2">Things I built for fun</h2>
        <CardsDemo />
      </section>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Hao Le',
  description: 'Web Developer. Photography and UX Enthusiast.',
  openGraph: {
    url: process.env.NEXT_PUBLIC_HOST || 'https://www.hspln.com',
  },
}
