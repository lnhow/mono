import { NavBar } from '../components/NavBar'
import { BaseLayoutProps } from '../types'

export default function LayoutDefault({ children }: BaseLayoutProps) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  )
}
