import React from 'react'
import { getParentCategory, mapToProps } from '../api'
import ModalContainer from './ModalContainer'

export default async function FullCategoryModalButton() {
  const categoriesRes = await getParentCategory()
  const categories = mapToProps(categoriesRes)
  return (
    <>
      <ModalContainer>
        
      </ModalContainer>
    </>
  )
}
