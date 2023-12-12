import ModalContainer from './ModalContainer'
// import Grid from '@mui/material/Unstable_Grid2'
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
        {/* <Grid container spacing={2}>
          {categories.map((category) => {
            return (
              <Grid key={category.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <ItemCategory data={category} />
              </Grid>
            )
          })}
        </Grid> */}
      </ModalContainer>
    </>
  )
}
