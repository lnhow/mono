import { ICategory } from '@/common/types/category'
import {
  GetParentCategoriesDocument,
  GetParentCategoriesQuery,
} from '@/common/utils/graphql/_generated/graphql'
import { queryClient } from '@/common/utils/graphql/queryClient'
import { cache } from 'react'

export const getParentCategory = cache(() => {
  const gqlClient = queryClient.GraphQL()
  return gqlClient.request<GetParentCategoriesQuery>({
    document: GetParentCategoriesDocument,
  })
})

export const mapToProps = cache(
  (gqlRes: Awaited<ReturnType<typeof getParentCategory>>) => {
    const mappedData: ICategory[] = gqlRes.categories?.data.map((category) => {
      return {
        id: category.id,
        attributes: {
          ...(category.attributes),
          child_categories: category.attributes?.child_categories?.data || []
        }
      } as ICategory
    }) || []
    return mappedData
  }
)
