import dynamic from 'next/dynamic'
import { NavBar } from '../components/NavBar'
import { BaseLayoutProps } from '../types'

const ThemeChanger = dynamic(
  () => import('@/common/components/common/ThemeChanger'),
  {
    ssr: false,
  }
)

export default function LayoutDefault({ children }: BaseLayoutProps) {
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center p-24">
        {children}
      </main>
      <ThemeChanger />
    </>
  )
}
