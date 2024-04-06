import {
  GetParentCategoriesDocument,
  GetParentCategoriesQuery,
} from '@/data/graphql/_generated/graphql'
import { queryClient } from '@/data/graphql/queryClient'
import { mapCategoryToNwCategory } from '@/data/mapping/category'
import NwCategory from '@newts/ui/types/category'
import { cache } from 'react'

export const getParentCategory = cache(() => {
  const gqlClient = queryClient.GraphQL()
  return gqlClient.request<GetParentCategoriesQuery>({
    document: GetParentCategoriesDocument,
  })
})

export const mapToProps = cache(
  (gqlRes: Awaited<ReturnType<typeof getParentCategory>>) => {
    const mappedData = gqlRes.categories?.data.map(mapCategoryToNwCategory) || [] as NwCategory[]
    return mappedData
  }
)
