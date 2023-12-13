import QuickCategoryList from './QuickCategoryList'
import FullCategoryModalButton from './FullCategoryModal'
import SearchButton from './SearchButton'
import { NwCategoryGroupProps } from '@newts/ui/types/components/category.type'
import { NwVerticalDivider } from '@newts/ui/components/common/NwDivider/Vertical'

export default async function Navbar({ data }: NwCategoryGroupProps) {
  return (
    <div
      className="
      w-full dark:bg-bgprimary-800 bg-bgprimary-300
      sticky top-0 z-20"
    >
      <nav className="max-w-screen-2xl h-10 mx-auto sm:px-3 flex
        [&_.btn:not(dialog_.btn)]:h-10
        [&_.btn:not(dialog_.btn)]:min-h-[40px]
        [&_.btn-square:not(dialog_.btn)]:w-10"
      >
        <FullCategoryModalButton data={data} />
        <NwVerticalDivider />
        <QuickCategoryList data={data} />
        <NwVerticalDivider />
        <SearchButton />
      </nav>
    </div>
  )
}
