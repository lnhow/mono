import React from 'react'
import { getParentCategory, mapToProps } from '../api'
import ModalContainer from './ModalContainer'
import Grid from '@mui/material/Unstable_Grid2'
import ItemCategory from './ItemCategory'

export default async function FullCategoryModalButton() {
  const categoriesRes = await getParentCategory()
  const categories = mapToProps(categoriesRes)
  return (
    <>
      <ModalContainer>
        <Grid container spacing={2}>
          {categories.map((category) => {
            return (
              <Grid key={category.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <ItemCategory data={category} />
              </Grid>
            )
          })}
        </Grid>
      </ModalContainer>
    </>
  )
}
