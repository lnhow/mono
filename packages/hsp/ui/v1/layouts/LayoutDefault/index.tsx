import Footer from '../components/Footer'
import { NavBar } from '../components/Header'
import type { BaseLayoutProps } from '../types'

export type LayoutDefaultProps = BaseLayoutProps

export default function LayoutDefault({ children }: LayoutDefaultProps) {
  return (
    <>
      <NavBar />
      <main className="min-h-screen mx-auto px-2 pt-6 lg:pt-8 pb-16 lg:px-4">
        {children}
      </main>
      <Footer />
    </>
  )
}
