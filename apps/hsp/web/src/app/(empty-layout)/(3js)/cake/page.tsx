import { Metadata } from 'next'
import Main from './_experience'
import { Provider } from 'jotai'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Cake',
  openGraph: {
    title: 'Cake',
    description: 'Someone sent a cake!',
  }
}

export default function Page() {
  return (
    <main className="fixed top-0 left-0 w-full h-full">
      <Provider>
        <Main />
      </Provider>
    </main>
  )
}
