import LayoutDefault from '@hsp/ui/layouts/LayoutDefault'
import { PropsWithChildren } from 'react'

export default function IndexLayout({ children }: PropsWithChildren) {

  return (
    <LayoutDefault>
      {children}
    </LayoutDefault>
  )
}
