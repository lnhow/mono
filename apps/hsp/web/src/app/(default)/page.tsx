import PersonalGithub from '@hsp/ui/src/modules/personal/github'
import PersonalLinkedinLink from '@hsp/ui/src/modules/personal/linkedin'
import CardsDemo from '@hsp/ui/src/modules/default/modules/home/page'
import CardPost from '@hsp/ui/src/modules/posts/card'
import { PostUtils } from '@hsp/ui/src/modules/posts/utils'
import { allPosts } from 'content-collections'
import { Metadata } from 'next'

export default function HomePage() {
  // Get the latest 10 posts
  const posts = allPosts
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
    .slice(0, 9)

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto md:px-4 py-8">
      <section className="mt-[18%] mb-[9%]">
        <h1 className="text-4xl">
          <span className="text-fore-200 text-6xl font-bold">Hi,</span>
          <br /> I&apos;m Hao
        </h1>
        <p className="text-xs text-fore-100 mb-4">(Lê Nguyên Hào)</p>
        <h2 className="text-md text-fore-200">
          Web Developer. Photography and UX Enthusiast.
        </h2>
        <div className='flex gap-2 flex-wrap mt-6'>
          <PersonalGithub />
          <PersonalLinkedinLink />
        </div>
      </section>
      {posts.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl mb-4">Latest Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
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
      <section className="mt-8">
        <h2 className="text-2xl mb-4">Things I built for fun</h2>
        <CardsDemo />
      </section>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Hao Le',
  description: 'Web Developer. Photography and UX Enthusiast.',
  openGraph: {
    url: process.env.NEXT_PUBLIC_HOST || 'https://www.hspln.com',
  },
}
