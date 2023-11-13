import { queryClient } from '@/data/graphql/queryClient'
import { cache } from 'react'

import {
  CategoriesBySlugUrlDocument,
  CategoriesBySlugUrlQuery,
  FeaturedPostsDocument,
  FeaturedPostsQuery,
  FeaturedPostsQueryVariables,
  GetPostsByCategorySlugDocument,
  GetPostsByCategorySlugQuery,
  // GetPostsByCategorySlugQueryVariables,
} from '@/data/graphql/_generated/graphql'

export const getFeaturedPosts = cache((skip = 0, limit = 3) => {
  const gqlClient = queryClient.GraphQL()
  return gqlClient.request<FeaturedPostsQuery, FeaturedPostsQueryVariables>({
    document: FeaturedPostsDocument,
    variables: { skip, limit },
  })
})

// export const getPostsByCategory = cache(
//   (category: string, skip = 0, limit = 3) => {
//     const gqlClient = queryClient.GraphQL()
//     return gqlClient.request<
//       GetPostsByCategorySlugQuery,
//       GetPostsByCategorySlugQueryVariables
//     >({
//       document: GetPostsByCategorySlugDocument,
//       variables: { categorySlug: category, skip, limit },
//     })
//   }
// )

export const getFeatureCategoryDataBySlug = cache((category: string) => {
  const gqlClient = queryClient.GraphQL()
  return gqlClient.batchRequests<
    [{ data: GetPostsByCategorySlugQuery }, { data: CategoriesBySlugUrlQuery }]
  >([
    {
      document: GetPostsByCategorySlugDocument,
      variables: { categorySlug: category, skip: 0, limit: 3 },
    },
    { document: CategoriesBySlugUrlDocument, variables: { categorySlug: category } },
  ])
})
