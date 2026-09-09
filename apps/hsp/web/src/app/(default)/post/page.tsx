import CardsDemo from '@hsp/ui/modules/default/modules/home/page'
import CardPost from '@hsp/ui/modules/posts/card'
import { PostUtils } from '@hsp/ui/modules/posts/utils'
import { allPosts } from 'content-collections'
import type { Metadata } from 'next'

const getLatestPosts = (n = 10) => {
  // Get the latest 10 posts
  return allPosts
    .filter((post) => PostUtils.shouldShow(post.draft) && post.slug !== 'test')
    .sort((a, b) => {
      // Sort by date descending
      // Use updatedAt if available, otherwise use createdAt
      // If both are the same, sort by createdAt descending
      const dateA = new Date(a.updatedAt || a.createdAt).getTime()
      const dateB = new Date(b.updatedAt || b.createdAt).getTime()

      if (dateA === dateB) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }

      return dateB - dateA
    })
    .slice(0, n - 1)
}

export default function PostPage() {
  const latestPosts = getLatestPosts()

  return (
    <div className="flex flex-col gap-4 md:px-4 pb-8">
      {latestPosts.length > 0 && (
        <section className="mt-8 max-w-7xl mx-auto w-full">
          <h2 className="text-2xl mb-4">Latest Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestPosts.map((post) => (
              <CardPost
                key={post.slug}
                title={post.title}
                description={post.description}
                readingTimeMinutes={post.readingTime}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                slug={post.slug}
                tags={post.tags || []}
              />
            ))}
          </div>
        </section>
      )}
      <section className="mt-8 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl mb-4">Things I built for fun</h2>
        <CardsDemo />
      </section>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Posts & Projects',
  description: 'Articles, thoughts, and things I built for fun.',
  openGraph: {
    url: process.env.NEXT_PUBLIC_HOST
      ? `${process.env.NEXT_PUBLIC_HOST}/post`
      : 'https://www.haoln7f8.com/post',
  },
}
