import { BaseLayoutProps } from '@/common/layouts/types'
import { NavBar } from '../components/NavBar'
import Footer from '@newts/ui/components/layout/components/Footer'

export type LayoutDefaultProps = BaseLayoutProps

export default function LayoutDefault({ children }: LayoutDefaultProps) {
  return (
    <>
      <NavBar />
      <main className="
        min-h-screen max-w-screen-2xl
        mx-auto px-2 pt-8 lg:pt-12 pb-16 lg:px-4
      ">
        {children}
      </main>
      <Footer />
    </>
  )
}
