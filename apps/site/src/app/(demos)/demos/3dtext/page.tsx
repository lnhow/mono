import { Metadata } from 'next'
import PageCanvas from './_components'

export const metadata: Metadata = {
  title: '3D Text',
}

export default function Page() {
  return (
    <main className='min-h-screen fixed top-0 left-0 w-full h-full'>
      <PageCanvas />
    </main>
  )
}
