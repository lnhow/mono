import { NwCategoryGroupProps } from '@/types/components/category.type'
// import { getParentCategory, mapToProps } from '../api'
import ItemCategory from './ItemCategory'
import SwiperContainer from './Swiper'

export default async function QuickCategoryList({ data: categories }: NwCategoryGroupProps) {
  // const categoriesRes = await getParentCategory()
  // const categories = mapToProps(categoriesRes)

  return (
    <div className="h-full flex flex-1 justify-start overflow-hidden">
      <SwiperContainer>
        {categories.map((category) => {
          return (
            <swiper-slide key={category.id} class="w-fit">
              <ItemCategory data={category} />
            </swiper-slide>
          )
        })}
      </SwiperContainer>
    </div>
  )
}
