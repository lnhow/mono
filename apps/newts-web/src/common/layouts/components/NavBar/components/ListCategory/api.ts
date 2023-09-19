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
    console.log('[Dev Log] -> file: api.ts:18 -> gqlRes:', gqlRes)
    return (gqlRes.categories?.data as ICategory[]) || []
  }
)
