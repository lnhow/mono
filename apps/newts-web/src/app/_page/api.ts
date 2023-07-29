import { GetAllPostsDocument, GetAllPostsQuery, GetParentCategoriesDocument, GetParentCategoriesQuery } from '@/common/utils/graphql/_generated/graphql'
import { queryClient } from '@/common/utils/graphql/queryClient'

export const getPageHomeData = () => {
  const gqlClient = queryClient.GraphQL()
  return gqlClient.batchRequests<[{data: GetParentCategoriesQuery}, {data: GetAllPostsQuery}]>([
    {document: GetParentCategoriesDocument},
    {document: GetAllPostsDocument},
  ])
}