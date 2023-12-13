import ModalContainer from './ModalContainer'
import ItemCategory from './ItemCategory'
import { NwCategoryGroupProps } from '@newts/ui/types/components/category.type'

export default async function FullCategoryModalButton({ data: categories }: NwCategoryGroupProps) {
  return (
    <>
      <ModalContainer>
        <div className='grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        {categories.map((category) => {
            return (
              <ItemCategory key={category.id} data={category} />
            )
          })}
        </div>
      </ModalContainer>
    </>
  )
}
