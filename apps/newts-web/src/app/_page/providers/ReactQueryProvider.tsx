'use client'

import React from 'react'
import { QueryClientProvider, Hydrate, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <Hydrate>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
