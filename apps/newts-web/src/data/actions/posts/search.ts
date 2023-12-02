import { queryClient } from '@/data/graphql/queryClient'
import {
  PostByFilterDocument,
  PostByFilterQuery,
  PostByFilterQueryVariables,
} from '@/data/graphql/_generated/graphql'
import { cache } from 'react'
import { PostFiltersInput } from '@/data/graphql/_generated/types'

export const ParamNameSearchPost = ['query', 'category'] as const

export type TParamName = (typeof ParamNameSearchPost)[number]
export type TParamValue = string | undefined
export type TParamSearchPost = Partial<Record<TParamName, TParamValue>>

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

export const searchParamsMapper: Record<
  TParamName,
  (params: TParamValue) => object
> = {
  query: (params: TParamValue) => {
    const processedParams = Array.isArray(params) ? params[0] : params
    return {
      title: { containsi: processedParams },
    }
  },
  category: (params: TParamValue) => {
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


