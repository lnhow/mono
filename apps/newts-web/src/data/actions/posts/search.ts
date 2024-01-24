import { queryClient } from '@/data/graphql/queryClient'
import {
  PostByFilterDocument,
  PostByFilterQuery,
  PostByFilterQueryVariables,
} from '@/data/graphql/_generated/graphql'
import { cache } from 'react'
import { PostFiltersInput } from '@/data/graphql/_generated/types'

export const ParamNameSearchPost = ['query', 'category', 'slug'] as const

export type TParamName = (typeof ParamNameSearchPost)[number]
export type TParamValue = string | undefined
export type TParamSearchPost = Partial<Record<TParamName, TParamValue>>

export const fetchSearchPost = cache(
  (searchParams: TParamSearchPost, page = 1, pageSize = 20) => {
    const searchFilter = buildSearchFilter(searchParams)
    const gqlClient = queryClient.GraphQL()

    return gqlClient.request<PostByFilterQuery, PostByFilterQueryVariables>({
      document: PostByFilterDocument,
      variables: { filter: searchFilter, page, pageSize },
    })
  }
)

export const buildSearchFilter = (searchParams: TParamSearchPost) => {
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
  return searchFilter
}

export const searchParamsMapper: Record<
  TParamName,
  (params: TParamValue) => object
> = {
  query: (params: TParamValue) => {
    return {
      title: { containsi: params },
    }
  },
  category: (params: TParamValue) => {
    return {
      or: [
        { category: { slugUrl: { eq: params } } },
        {
          category: {
            parent_category: { slugUrl: { eq: params } },
          },
        },
      ],
    }
  },
  slug: (params: TParamValue) => {
    return {
      slugUrl: { eq: params },
    }
  },
}


