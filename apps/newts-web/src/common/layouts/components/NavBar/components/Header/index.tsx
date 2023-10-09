import { STALE_TIME } from '@newts/common.gui/constants/staleTime'
import { getParentCategory, mapToProps } from './api'
import ItemCategory from './QuickCategoryList/ItemCategory'
import QuickCategoryList from './QuickCategoryList'
import FullCategoryModalButton from './FullCategoryModal'
// import { ICategory } from '@/common/types/category'

export const revalidate = STALE_TIME.DEFAULT

export default async function Header() {
  return (
    <div className='w-full dark:bg-zinc-800 bg-zinc-300'>
      <div className="max-w-screen-2xl h-10 mx-auto px-3 flex">
        <FullCategoryModalButton />
        <QuickCategoryList />
      </div>
    </div>
  )
}
