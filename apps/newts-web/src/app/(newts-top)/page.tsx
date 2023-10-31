import { Metadata } from 'next'
import { PAGE_REVALIDATE } from '@newts/ui/constants/staleTime'
import PostsByCategory from '@newts/ui/components/pages/index/PostsByCategory'
import PostsByCategorySkeleton from '@newts/ui/components/pages/index/PostsByCategory/skeleton'
import { Suspense } from 'react'
import FeaturedPosts from './_page/FeaturedPosts'
import { pageHomeCategories } from './const'

export const revalidate = PAGE_REVALIDATE.DEFAULT

export const metadata: Metadata = {
  title: 'Newts | A testing news website',
  description: 'A testing news website',
}

export default async function Page() {
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
