import { BaseLayoutProps } from '../types'
import { NavBar } from '../components/Header'
import Footer from '../components/Footer'
import NwCategory from '@/types/category'

export type LayoutDefaultProps = BaseLayoutProps & {
  categories: NwCategory[]
}

export default function LayoutDefault({ children, categories }: LayoutDefaultProps) {
  return (
    <>
      <NavBar data={categories} />
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
