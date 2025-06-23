import CardsDemo from '@hsp/ui/src/modules/default/modules/home/page'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Welcome to Hammerspace</h1>
      <p className="text-md text-fore-200">
        Below is a collection of demo & experiment.
      </p>
      <CardsDemo />
    </div>
  )
}

export const metadata = {
  title: 'Home Page - hsp',
  description: 'This is the default home page of the application.',
}
