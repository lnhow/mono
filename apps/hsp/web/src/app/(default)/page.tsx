import PersonalGithub from '@hsp/ui/modules/personal/github'
import PersonalLinkedinLink from '@hsp/ui/modules/personal/linkedin'
import CardsDemo from '@hsp/ui/modules/default/modules/home/page'
import CardPost from '@hsp/ui/modules/posts/card'
import { PostUtils } from '@hsp/ui/modules/posts/utils'
import { allPosts } from 'content-collections'
import { Metadata } from 'next'
import PaperTexture from './_components/hero/natural-paper.png'
import Time from './_components/hero/time'

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

export default function HomePage() {
  const latestPosts = getLatestPosts()

  return (
    <div className="flex flex-col gap-4 md:px-4 pb-8">
      <section className="relative -mx-(--layout-spacing) px-(--layout-spacing) py-10 md:-mx-[calc(var(--layout-spacing)+4*var(--spacing))] flex flex-col justify-center">
        <div className="@container relative max-w-7xl mx-auto w-full mb-2 h-4 border-fore-100 border-x border-t rounded-t-2xl">
          <div className="absolute -top-3 left-4 right-4 flex gap-3 overflow-hidden">
            <Time
              className="border-x border-fore-100 px-1 bg-base-100 text-sm text-ellipsis w-23 text-right whitespace-nowrap"
              mode="date"
              format={{
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }}
            />
            <Time
              className="hidden @xs:inline-block border-x border-fore-100 px-1 bg-base-100 text-sm text-ellipsis w-23 text-right whitespace-nowrap"
              format={{
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }}
            />
          </div>
        </div>
        <div
          className="w- max-w-[calc(var(--container-7xl)-var(--spacing)*8)] flex-1 xl:w-full relative bg-repeat py-22 mx-4 xl:mx-auto md:px-[calc(var(--layout-spacing)+4*var(--spacing))] bg-dash"
          style={{
            backgroundSize: '6px 2.5rem',
          }}
        >
          <h1 className="text-4xl">
            <span className="text-fore-200 text-6xl font-bold">Hi,</span>
            <br /> I&apos;m Hào
          </h1>
          {/*<p className="text-xs text-fore-100 mb-4">(Lê Nguyên Hào)</p>*/}
          <h2 className="text-md text-fore-200 mt-1 leading-10">
            Web Developer. Photography and UX Enthusiast.
          </h2>
          <div className="flex gap-2 flex-wrap mt-8">
            <PersonalGithub />
            <PersonalLinkedinLink />
          </div>
        </div>
        <div className="max-w-7xl mx-auto w-full mt-2 h-4 border-fore-100 border-x border-b rounded-b-2xl" />
        <div
          className="absolute w-full h-full top-0 left-0 mix-blend-overlay bg-repeat pointer-events-none z-10 bg-fore-400 dark:bg-transparent"
          style={{
            backgroundImage: `url(${PaperTexture.src.toString()})`,
          }}
        />
      </section>
      {latestPosts.length > 0 && (
        <section className="mt-8 max-w-7xl mx-auto">
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
      <section className="mt-8 max-w-7xl mx-auto">
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
