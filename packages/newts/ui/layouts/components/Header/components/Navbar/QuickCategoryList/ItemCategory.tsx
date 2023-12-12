'use client'
import Link from 'next/link'
import { memo, useMemo } from 'react'
import { PropsItemCategory } from '../types'
import { usePathname } from 'next/navigation'
import classNames from '@newts/ui/utils/classNames'

const ItemCategory = memo(function ItemCategory({
  data: category,
}: PropsItemCategory) {
  const pathname = usePathname()
  const linkUrl = useMemo(
    () =>
      category.attributes.slugUrl ? `/c/${category.attributes.slugUrl}` : '#',
    [category.attributes.slugUrl]
  )
  const isActive = pathname === linkUrl
  return (
    <Link
      className={classNames(
        'btn btn-ghost normal-case font-light rounded-md',
        isActive && 'text-primary border-b-primary'
      )}
      href={linkUrl}
      color="inherit"
    >
      {category.attributes.title}
    </Link>
  )
})

export default ItemCategory
