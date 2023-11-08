import { CategoryEntity } from '@/data/graphql/_generated/types'
import NwCategory from '@newts/ui/types/category'

export const mapCategoryToNwCategory = (category: CategoryEntity): NwCategory => {
  const childCategories = category.attributes?.child_categories?.data || []
  return {
    id: category.id || '',
    attributes: {
      ...category.attributes,
      child_categories: childCategories.map(mapCategoryToNwCategory),
    },
  }
}
