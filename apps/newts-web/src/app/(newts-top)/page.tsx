import { Metadata } from 'next'
// import { Hydrate, dehydrate } from '@tanstack/react-query'

// import { getPageHomeData } from './_page/api'
// import { queryClient } from '@/common/utils/graphql/queryClient'
// import PageHomeWrapper from './_page/components/PageHomeWrapper.component'
// import { INITIAL_QUERY_KEY } from './_page/types'
import { PAGE_REVALIDATE } from '@newts/common.gui/constants/staleTime'
import FeaturedPosts from '@newts/common.gui/components/pages/index/FeaturedPosts'
import PostsByCategory from '@newts/common.gui/components/pages/index/PostsByCategory'
import PostsByCategorySkeleton from '@newts/common.gui/components/pages/index/PostsByCategory/skeleton'
import { Suspense } from 'react'

export const revalidate = PAGE_REVALIDATE.DEFAULT

export const metadata: Metadata = {
  title: 'Newts | A testing news website',
  description: 'A testing news website',
}

export const pageHomeCategories = ['general', 'intriguings', 'dev', 'ideas', 'design']

export default async function Page() {
  // const http = queryClient.QueryClient()
  // await http.prefetchQuery({
  //   queryKey: [INITIAL_QUERY_KEY],
  //   queryFn: getPageHomeData,
  //   staleTime: STALE_TIME.PAGES.HOME,
  // })
  // const dehydratedState = dehydrate(http)
  // return (
  //   <Hydrate state={dehydratedState}>
  //     <div className="p-4 lg:p-24">
  //       <ABCTest />
  //       <PageHomeWrapper />
  //     </div>
  //   </Hydrate>
  // )
  return (
    <div>
      <FeaturedPosts />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageHomeCategories.map((category) => ( 
          <Suspense key={category} fallback={<PostsByCategorySkeleton />}>
            <PostsByCategory />
          </Suspense>
        ))}
      </div>
    </div>
  )
}
