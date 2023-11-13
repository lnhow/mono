import { Metadata } from 'next'
import { PAGE_REVALIDATE } from '@newts/ui/constants/staleTime'
import FeaturedPosts from './_page/FeaturedPosts'
import { pageHomeCategories } from './const'
import PostsByCategory from './_page/PostsByCategory'

export const revalidate = PAGE_REVALIDATE.DEFAULT

export const metadata: Metadata = {
  title: 'Newts | A testing news website',
  description: 'A testing news website',
}

export default async function Page() {
  return (
    <div>
      <FeaturedPosts />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pageHomeCategories.map((category) => ( 
          <PostsByCategory key={category} category={category} />
        ))}
      </div>
    </div>
  )
}
