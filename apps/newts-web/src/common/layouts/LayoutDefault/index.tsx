import dynamic from 'next/dynamic'
import { BaseLayoutProps } from '@/common/layouts/types'
import { NavBar } from '../components/NavBar'


const ThemeChanger = dynamic(
  () => import('@newts/common.gui/components/ThemeChanger'),
  {
    ssr: false,
  }
)

export type LayoutDefaultProps = BaseLayoutProps

export default function LayoutDefault({ children }: LayoutDefaultProps) {
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center">
        {children}
      </main>
      <ThemeChanger />
    </>
  )
}
