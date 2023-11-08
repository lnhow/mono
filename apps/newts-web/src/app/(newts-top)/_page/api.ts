import { queryClient } from '@/data/graphql/queryClient'
import { cache } from 'react'

import {
  FeaturedPostsDocument,
  FeaturedPostsQuery,
  FeaturedPostsQueryVariables,
  GetPostsByCategorySlugDocument,
  GetPostsByCategorySlugQuery,
  GetPostsByCategorySlugQueryVariables,
} from '@/data/graphql/_generated/graphql'

export const getFeaturedPosts = cache((skip = 0, limit = 3) => {
  const gqlClient = queryClient.GraphQL()
  return gqlClient.request<FeaturedPostsQuery, FeaturedPostsQueryVariables>({
    document: FeaturedPostsDocument,
    variables: { skip, limit },
  })
})

export const getPostsByCategory = cache(
  (category: string, skip = 0, limit = 3) => {
    const gqlClient = queryClient.GraphQL()
    return gqlClient.request<
      GetPostsByCategorySlugQuery,
      GetPostsByCategorySlugQueryVariables
    >({
      document: GetPostsByCategorySlugDocument,
      variables: { categorySlug: category, skip, limit },
    })
  }
)
