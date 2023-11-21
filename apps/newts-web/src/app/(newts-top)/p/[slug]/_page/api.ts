import { queryClient } from '@/data/graphql/queryClient'
import {
  GetPostBySlugDocument,
  GetPostBySlugQuery,
  GetPostBySlugQueryVariables,
} from '@/data/graphql/_generated/graphql'
import { cache } from 'react'

export const fetchSearchPost = cache((slug: string) => {
  const gqlClient = queryClient.GraphQL()
  return gqlClient.request<GetPostBySlugQuery, GetPostBySlugQueryVariables>({
    document: GetPostBySlugDocument,
    variables: { slug },
  })
})
