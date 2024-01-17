import { queryClient } from '@/data/graphql/queryClient'
import { cache } from 'react'

import {
  FeaturedPostsDocument,
  FeaturedPostsQuery,
  FeaturedPostsQueryVariables,
} from '@/data/graphql/_generated/graphql'

export const FEATURED_CATEGORY_SIZE = 3

export const getFeaturedPosts = cache((skip = 0, limit = 4) => {
  const gqlClient = queryClient.GraphQL()
  return gqlClient.request<FeaturedPostsQuery, FeaturedPostsQueryVariables>({
    document: FeaturedPostsDocument,
    variables: { skip, limit },
  })
})
