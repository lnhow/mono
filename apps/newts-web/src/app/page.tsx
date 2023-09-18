import { Metadata } from 'next'
import { Hydrate, dehydrate } from '@tanstack/react-query'

import { getPageHomeData } from './_page/api'
import { queryClient } from '@/common/utils/graphql/queryClient'
import PageHomeWrapper from './_page/components/PageHomeWrapper.component'
import { INITIAL_QUERY_KEY } from './_page/types'
import { PAGE_REVALIDATE, STALE_TIME } from '@newts/common.gui/constants/staleTime'

export const revalidate = PAGE_REVALIDATE.DEFAULT

export const metadata: Metadata = {
  title: 'Newts | A testing news website',
  description: 'A testing news website',
}

export default async function Page() {
  const http = queryClient.QueryClient()
  await http.prefetchQuery({
    queryKey: [INITIAL_QUERY_KEY],
    queryFn: getPageHomeData,
    staleTime: STALE_TIME.PAGES.HOME,
  })
  const dehydratedState = dehydrate(http)
  return (
    <Hydrate state={dehydratedState}>
      <div className="p-4 lg:p-24">
        <PageHomeWrapper />
      </div>
    </Hydrate>
  )
}
