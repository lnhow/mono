import { memo } from 'react'
import Link from 'next/link'

import { PropsItemCategory } from '../types'
import { Button, Divider, List, ListItemButton } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const ItemCategory = memo(function ItemCategory({ data }: PropsItemCategory) {
  const subCategories = data.attributes.child_categories || []
  return (
    <div>
      <Button
        className="
          text-txprimary-800 dark:text-txprimaryd-400
          text-xl font-extralight normal-case
          justify-between
          rounded-lg
        "
        color="inherit"
        fullWidth
        LinkComponent={Link}
        href={data.attributes.slugUrl || '#'}
        endIcon={<ArrowForwardIosIcon />}
      >
        {data.attributes.title}
      </Button>
      <List>
        {subCategories.map((category) => {
          return <ItemSubCategory key={category.id} data={category} />
        })}
      </List>
      <Divider />
    </div>
  )
})

export default ItemCategory

export const ItemSubCategory = memo(function ItemSubCategory({
  data,
}: PropsItemCategory) {
  return (
    <ListItemButton
      className="rounded-lg font-light"
      LinkComponent={Link}
      href={data.attributes.slugUrl || '#'}
    >
      {data.attributes.title}
    </ListItemButton>
  )
})
