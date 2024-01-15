import { queryClient } from '@/data/graphql/queryClient'
import { cache } from 'react'

import {
  CategoriesBySlugUrlDocument,
  CategoriesBySlugUrlQuery,
  FeaturedPostsDocument,
  FeaturedPostsQuery,
  FeaturedPostsQueryVariables,
  PostByFilterDocument,
  PostByFilterQuery,
} from '@/data/graphql/_generated/graphql'
import { buildSearchFilter } from '@/data/actions/posts/search'

export const FEATURED_CATEGORY_SIZE = 3

export const getFeaturedPosts = cache((skip = 0, limit = 4) => {
  const gqlClient = queryClient.GraphQL()
  return gqlClient.request<FeaturedPostsQuery, FeaturedPostsQueryVariables>({
    document: FeaturedPostsDocument,
    variables: { skip, limit },
  })
})

export const getFeatureCategoryDataBySlug = cache((category: string) => {
  const searchFilter = buildSearchFilter({ category: category })
  const gqlClient = queryClient.GraphQL()
  return gqlClient.batchRequests<
    [{ data: PostByFilterQuery }, { data: CategoriesBySlugUrlQuery }]
  >([
    {
      document: PostByFilterDocument,
      variables: {
        filter: searchFilter,
        page: 1,
        pageSize: FEATURED_CATEGORY_SIZE,
      },
    },
    {
      document: CategoriesBySlugUrlDocument,
      variables: { categorySlug: category },
    },
  ])
})
