import { BaseLayoutProps } from '@/common/layouts/types'
import { NavBar } from '../components/NavBar'

export type LayoutDefaultProps = BaseLayoutProps

export default function LayoutDefault({ children }: LayoutDefaultProps) {
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center">
        {children}
      </main>
    </>
  )
}
