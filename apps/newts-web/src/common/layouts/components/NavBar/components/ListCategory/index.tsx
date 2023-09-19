import { STALE_TIME } from '@newts/common.gui/constants/staleTime'
import { getParentCategory, mapToProps } from './api'
import ItemCategory from './ItemCategory'
// import { ICategory } from '@/common/types/category'

export const revalidate = STALE_TIME.DEFAULT

export default async function ListCategory() {
  const categoriesRes = await getParentCategory()
  const categories = mapToProps(categoriesRes)
  console.log(
    '[Dev Log] -> file: index.tsx:13 -> ListCategory -> categories:',
    categories
  )
  return (
    <div className='w-full dark:bg-zinc-800 bg-zinc-300'>
      <div className="max-w-screen-2xl mx-auto px-3 flex">
        {categories.map((category) => {
          return <ItemCategory key={category.id} data={category} />
        })}
      </div>
    </div>
  )
}
