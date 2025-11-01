import { Metadata } from 'next'
import Main from './_experience'
import { Provider } from 'jotai'
import { ViewTransition } from 'react'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Cake',
  description: 'Someone sent a cake!',
  openGraph: {
    title: 'Cake',
    description: 'Someone sent a cake!',
  }
}

export default function Page() {
  return (
    <ViewTransition name="cake-card" update="none">
      <main className="fixed top-0 left-0 w-full h-full">
        <Provider>
          <Main />
        </Provider>
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-neutral-900">
          <h1 className='sr-only'>Cake</h1>
          <p>Loading...</p>
        </div>
      </main>
    </ViewTransition>
  )
}
