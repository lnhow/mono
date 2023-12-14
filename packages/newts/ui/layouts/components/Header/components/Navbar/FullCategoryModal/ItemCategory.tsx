import { memo } from 'react'
import Link from 'next/link'

import { PropsItemCategory } from '../types'
import { MdOutlineArrowForwardIos } from 'react-icons/md'

const ItemCategory = memo(function ItemCategory({ data }: PropsItemCategory) {
  const subCategories = data.attributes.child_categories || []
  const linkUrl = data.attributes.slugUrl
    ? `/c/${data.attributes.slugUrl}`
    : '#'
  return (
    <div>
      <Link
        className="w-full btn h-auto btn-ghost rounded-lg
          text-xl font-extralight normal-case
          flex justify-between pr-2
        "
        color="inherit"
        href={linkUrl}
      >
        {data.attributes.title}
        <MdOutlineArrowForwardIos className='icon-md' />
      </Link>
      <ul>
        {subCategories.map((category) => {
          return <ItemSubCategory key={category.id} data={category} />
        })}
      </ul>
      <div className='my-2 mb-0 divider divider-base-100'></div>
    </div>
  )
})

export default ItemCategory

export const ItemSubCategory = memo(function ItemSubCategory({
  data,
}: PropsItemCategory) {
  const linkUrl = data.attributes.slugUrl
    ? `/c/${data.attributes.slugUrl}`
    : '#'

  return (
    <li>
      <Link
        className="w-full btn h-auto btn-ghost rounded-lg font-light text-left justify-start"
        href={linkUrl}
      >
        {data.attributes.title}
      </Link>
    </li>
  )
})
