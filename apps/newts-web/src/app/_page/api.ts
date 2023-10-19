import { GetAllPostsDocument, GetAllPostsQuery, GetParentCategoriesDocument, GetParentCategoriesQuery } from '@/data/graphql/_generated/graphql'
import { queryClient } from '@/data/graphql/queryClient'
import { cache } from 'react'

export const getPageHomeData = cache(() => {
  const gqlClient = queryClient.GraphQL()
  return gqlClient.batchRequests<[{data: GetParentCategoriesQuery}, {data: GetAllPostsQuery}]>([
    {document: GetParentCategoriesDocument},
    {document: GetAllPostsDocument},
  ])
})