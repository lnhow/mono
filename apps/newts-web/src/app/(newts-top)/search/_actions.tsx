import { queryClient } from '@/data/graphql/queryClient'
import {
  PostByFilterDocument,
  PostByFilterQuery,
  PostByFilterQueryVariables,
} from '@/data/graphql/_generated/graphql'
import { cache } from 'react'
import { PostFiltersInput } from '@/data/graphql/_generated/types'

export const ParamNameSearchPost = ['searchTerms', 'categorySlug'] as const
export type TParamNameSearchPost = (typeof ParamNameSearchPost)[number]

export type TParamSearchPost = Record<TParamNameSearchPost, string | string[] | undefined>

const searchParamsMapper: Record<
  TParamNameSearchPost,
  (params: string | string[]) => object
> = {
  searchTerms: (params: string | string[]) => {
    const processedParams = Array.isArray(params) ? params[0] : params
    return {
      title: { containsi: processedParams },
    }
  },
  categorySlug: (params: string | string[]) => {
    const processedParams = Array.isArray(params) ? params[0] : params
    return {
      or: [
        { category: { slugUrl: { eq: processedParams } } },
        {
          category: {
            parent_category: { slugUrl: { eq: processedParams } },
          },
        },
      ],
    }
  },
}

export const fetchSearchPost = cache(
  (searchParams: TParamSearchPost, page = 1, pageSize = 20) => {
    const searchFilter: PostFiltersInput = {
      and: Object.keys(searchParams).reduce((filter, key) => {
        // @ts-ignore-next-line
        if (!searchParams[key]) return filter
        // @ts-ignore-next-line
        return searchParamsMapper[key](searchParams[key])
      }, []),
    }

    if (searchFilter.and?.length === 0) {
      delete searchFilter.and
    }

    const gqlClient = queryClient.GraphQL()
    return gqlClient.request<PostByFilterQuery, PostByFilterQueryVariables>({
      document: PostByFilterDocument,
      variables: { filter: searchFilter, page, pageSize },
    })
  }
)
