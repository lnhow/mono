import { GraphQLClient } from 'graphql-request'
import { QueryClient } from 'react-query'

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_MAIN_API as string

export const strapiGraphql = new GraphQLClient(
  `${GRAPHQL_ENDPOINT}/graphql`, {
    credentials: 'include',
    mode: 'cors',
  }
)

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
})
