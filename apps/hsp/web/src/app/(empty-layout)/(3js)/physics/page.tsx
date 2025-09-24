import { Metadata } from 'next'
import Scene from './_scene'

export const dynamic = 'force-static'
export const metadata: Metadata = {
  title: 'Physics - 3js',
}

export default function Page() {
  return (
    <main className="fixed top-0 left-0 w-full h-full">
      <Scene />
    </main>
  )
}
