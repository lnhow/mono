import { queryClient } from '@/common/utils/graphql/queryClient'
import {
  GetPostBySlugDocument,
  GetPostBySlugQuery,
  GetPostBySlugQueryVariables,
} from '@/common/utils/graphql/_generated/graphql'
import { cache } from 'react'

export const getPostBySlug = cache((slug: string) => {
  const gqlClient = queryClient.GraphQL()
  return gqlClient.request<GetPostBySlugQuery, GetPostBySlugQueryVariables>({
    document: GetPostBySlugDocument,
    variables: { slug },
  })
})
