import { BaseLayoutProps } from '@/common/layouts/types'
import { NavBar } from '../components/NavBar'

export type LayoutDefaultProps = BaseLayoutProps

export default function LayoutDefault({ children }: LayoutDefaultProps) {
  return (
    <>
      <NavBar />
      <main className="min-h-screen max-w-screen-2xl mx-auto py-4 lg:py-8">
        {children}
      </main>
    </>
  )
}
