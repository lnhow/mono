import { Metadata } from 'next'
import Main from './_experience'


export const metadata: Metadata = {
  title: 'Cake',
}

export default function Page() {
  return (
    <main className='min-h-screen fixed top-0 left-0 w-full h-full'>
      <Main />
    </main>
  )
}
