import LayoutDefault from '@newts/ui/layouts/LayoutDefault'
import { PropsWithChildren } from 'react'
import { getParentCategory, mapToProps } from '@/common/layouts/api'


export default async function IndexLayout({ children }: PropsWithChildren) {
  const categoriesRes = await getParentCategory()
  const categories = mapToProps(categoriesRes)

  return (
    <LayoutDefault categories={categories}>
      {children}
    </LayoutDefault>
  )
}
