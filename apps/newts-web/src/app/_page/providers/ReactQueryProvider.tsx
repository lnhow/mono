'use client'

import React from 'react'
import { QueryClientProvider, Hydrate, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppConfigQueryClient } from '@/data/graphql/queryClient'

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient(AppConfigQueryClient))

  return (
    <QueryClientProvider client={client}>
      <Hydrate>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
