import LayoutDefault from '@/common/layouts/LayoutDefault'
import { PropsWithChildren } from 'react'

export default function IndexLayout({ children }: PropsWithChildren) {
  return (
    <LayoutDefault>
      {children}
    </LayoutDefault>
  )
}
