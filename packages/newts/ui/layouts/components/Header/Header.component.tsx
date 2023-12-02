import HeaderLeading from './components/Leading/Leading.component'
import Navbar from './components/Navbar'
import { NwCategoryGroupProps } from '@/types/components/category.type'

export default function Header({data}: NwCategoryGroupProps) {
  return (
    <>
      <HeaderLeading />
      <Navbar data={data} />
    </>
  )
}
