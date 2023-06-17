import { BaseLayoutProps } from '../types'

export default function LayoutEmpty({ children }: BaseLayoutProps) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
