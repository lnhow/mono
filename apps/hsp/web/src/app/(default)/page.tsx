import { ButtonLink } from '@hsp/ui/src/components/base/button'
import CardsDemo from '@hsp/ui/src/modules/default/modules/home/page'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto md:px-4 py-8">
      <section className="mt-[25%]">
        <h1 className="text-2xl font-bold mb-2">hi</h1>
        <p className="text-md text-fore-200">
          I&apos;m Hao Le (Lê Nguyên Hào) - A web developer.
          <br />
          This is where I put various things that I&apos;ve found interesting -
          My{' '}
          <ButtonLink
            href="https://en.wikipedia.org/wiki/Hammerspace"
            target="_blank"
            variant="link"
            className="p-0 text-fore-200 hover:text-fore-300 underline"
          >
            hammerspace
          </ButtonLink>
          , if you will.
          <br />Feel free to take a look!
        </p>
      </section>
      <CardsDemo />
    </div>
  )
}

export const metadata = {
  title: 'Hammerspace - haoln',
  description: 'This is the default home page of the application.',
}
