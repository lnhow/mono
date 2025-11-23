// TODO: Fix navigational issues due to React Three Fiber and Next 16 back/forward incompatibility
import { Metadata } from 'next'
import { Suspense, ViewTransition } from 'react'
import { Provider } from 'jotai'
import Main from './_experience'
import { Hydrate } from './_experience'

export const metadata: Metadata = {
  title: 'Cake',
  description: 'Someone sent a cake!',
  openGraph: {
    title: 'Cake',
    description: 'Someone sent a cake!',
  },
}

export default async function PageCake() {
  return (
    <ViewTransition name="cake-card" update="none">
      <main className="fixed top-0 left-0 w-full h-full">
        <Provider>
          <Suspense>
            <Hydrate />
          </Suspense>
          <Main />
        </Provider>
      </main>
    </ViewTransition>
  )
}
