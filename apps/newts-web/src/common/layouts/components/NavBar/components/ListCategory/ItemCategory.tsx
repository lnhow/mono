import { ICategory } from '@/common/types/category'
import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export type PropsItemCategory = {
  data: ICategory
}

export default function ItemCategory({ data: category }: PropsItemCategory) {
  const linkUrl = category.attributes.slugUrl ? `/c/${category.attributes.slugUrl}` : '#'
  return (
    <Button LinkComponent={Link} href={linkUrl} color='inherit'>
      {category.attributes.title}
    </Button>
  )
}
