import { buildSearchFilter } from '@/data/actions/posts/search'
import {
  CatWithChildBySlugUrlDocument,
  CatWithChildBySlugUrlQuery,
  PostByFilterDocument,
  PostByFilterQuery,
} from '@/data/graphql/_generated/graphql'
import { queryClient } from '@/data/graphql/queryClient'
import { cache } from 'react'

export const fetchCategoryAndPosts = cache(
  (category: string, page = 1, pageSize = 20) => {
    const searchFilter = buildSearchFilter({ category: category })
    const gqlClient = queryClient.GraphQL()

    return gqlClient.batchRequests<
      [{ data: PostByFilterQuery }, { data: CatWithChildBySlugUrlQuery }]
    >([
      {
        document: PostByFilterDocument,
        variables: { filter: searchFilter, page, pageSize },
      },
      {
        document: CatWithChildBySlugUrlDocument,
        variables: { categorySlug: category },
      },
    ])
  }
)
