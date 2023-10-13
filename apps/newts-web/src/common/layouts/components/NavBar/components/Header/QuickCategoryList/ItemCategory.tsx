import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { PropsItemCategory } from '../types'

export default function ItemCategory({ data: category }: PropsItemCategory) {
  const linkUrl = category.attributes.slugUrl
    ? `/c/${category.attributes.slugUrl}`
    : '#'
  return (
    <Button
      className="h-10 normal-case font-light"
      LinkComponent={Link}
      href={linkUrl}
      color="inherit"
    >
      {category.attributes.title}
    </Button>
  )
}
