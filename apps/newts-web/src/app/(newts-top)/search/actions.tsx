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

export type TParamSearchPost = Record<TParamNameSearchPost, string | undefined>

const searchParamsMapper: Record<
  TParamNameSearchPost,
  (params: string) => object
> = {
  searchTerms: (params: string) => {
    return {
      title: { containsi: params },
    }
  },
  categorySlug: (params: string) => {
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

    // if (searchParams.searchTerms) {
    //   searchFilter.and?.push({
    //     title: { contains: searchParams.searchTerms },
    //   })
    // }

    // if (searchParams.categorySlug) {
    //   searchFilter.and?.push({
    //     or: [
    //       { category: { slugUrl: { eq: searchParams.categorySlug } } },
    //       {
    //         category: {
    //           parent_category: { slugUrl: { eq: searchParams.categorySlug } },
    //         },
    //       },
    //     ],
    //   })
    // }

    console.log(
      '[Dev Log] -> file: actions.tsx:19 -> searchFilter:',
      searchFilter
    )

    const gqlClient = queryClient.GraphQL()
    return gqlClient.request<PostByFilterQuery, PostByFilterQueryVariables>({
      document: PostByFilterDocument,
      variables: { filter: searchFilter, page, pageSize },
    })
  }
)
