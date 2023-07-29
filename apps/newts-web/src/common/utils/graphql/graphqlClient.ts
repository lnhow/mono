import { GraphQLClient } from 'graphql-request'
import { cache } from 'react'
import { QueryClient } from '@tanstack/react-query'

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_MAIN_API as string

export const queryClient = {
  GraphQL: cache(() => new GraphQLClient(
    `${GRAPHQL_ENDPOINT}/graphql`, {
      credentials: 'include',
      mode: 'cors',
    }
  )),
  REST: cache(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 1000,
      },
    },
  }))
}
