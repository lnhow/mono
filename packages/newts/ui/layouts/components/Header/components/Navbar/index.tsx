import { STALE_TIME } from '@newts/ui/constants/staleTime'
import QuickCategoryList from './QuickCategoryList'
import FullCategoryModalButton from './FullCategoryModal'
import SearchButton from './SearchButton'
import { NwCategoryGroupProps } from '@/types/components/category.type'

export const revalidate = STALE_TIME.DEFAULT

export default async function Navbar({ data }: NwCategoryGroupProps) {
  return (
    <div className='
      w-full dark:bg-bgprimary-800 bg-bgprimary-300
      sticky top-0 z-20
    '>
      <div className="
        max-w-screen-2xl h-10 mx-auto px-1 sm:px-3 flex
        divide-x divide-gray-400 dark:divide-neutral-700
      ">
        <FullCategoryModalButton data={data} />
        <QuickCategoryList data={data} />
        <SearchButton />
      </div>
    </div>
  )
}
