'use client'
import { Button } from '@mui/material'
import Link from 'next/link'
import React, { memo } from 'react'
import { PropsItemCategory } from '../types'
import { usePathname } from 'next/navigation'

const ItemCategory = memo(function ItemCategory({ data: category }: PropsItemCategory) {
  const pathname = usePathname()
  const linkUrl = category.attributes.slugUrl
    ? `/c/${category.attributes.slugUrl}`
    : '#'
  const isActive = pathname === linkUrl
  console.log('[Dev Log] -> file: ItemCategory.tsx:14 -> ItemCategory -> isActive:', isActive)
  return (
    <Button
      className={`
        h-10 normal-case font-light
        ${isActive ? 
          'text-primary-700 dark:text-primary-300 border-b border-primary-700 dark:border-primary-300'
          :
          ''
        }
      `}
      LinkComponent={Link}
      href={linkUrl}
      color="inherit"
    >
      {category.attributes.title}
    </Button>
  )
})

export default ItemCategory
