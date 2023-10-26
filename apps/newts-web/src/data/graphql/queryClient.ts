import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'
import { QueryClient, QueryClientConfig } from '@tanstack/react-query'

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_MAIN_API as string

export const AppConfigQueryClient: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
}

export const queryClient = {
  GraphQL: cache(() => new GraphQLClient(
    `${GRAPHQL_ENDPOINT}/graphql`, {
      credentials: 'include',
      mode: 'cors',
    }
  )),
  QueryClient: cache(() => new QueryClient(AppConfigQueryClient))
}
