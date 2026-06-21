import { allPosts } from 'content-collections'
import type { Metadata } from 'next'
import Link from 'next/link'

import { ExperimentList } from '@/components/experiment-list'
import { PostCard } from '@/components/post-card'
import { getVisiblePosts } from '@/lib/posts'
import { homeMetadata } from '@/lib/site-metadata'

export const metadata: Metadata = homeMetadata

export default function HomePage() {
  const latestPosts = getVisiblePosts(allPosts).slice(0, 3)

  return (
    <div className="space-y-20">
      <section className="max-w-3xl space-y-6 py-12">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Web developer · Ho Chi Minh City
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          Hi, I’m Hào.
        </h1>
        <p className="text-lg leading-8 text-muted-foreground sm:text-xl">
          I build for the web and write about software, learning, and the ideas
          that stay with me. I’m also interested in photography and UX.
        </p>
        <div className="flex gap-5 text-sm font-medium">
          <a className="underline" href="https://github.com/lnhow">
            GitHub
          </a>
          <a className="underline" href="https://www.linkedin.com/in/lnhow/">
            LinkedIn
          </a>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Writing</p>
            <h2 className="text-3xl font-semibold tracking-tight">Latest posts</h2>
          </div>
          <Link className="text-sm font-medium underline" href="/blog">
            All posts
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">Playground</p>
          <h2 className="text-3xl font-semibold tracking-tight">Things built for fun</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            These experiments stay at their existing locations while the stable
            site evolves independently.
          </p>
        </div>
        <ExperimentList />
      </section>
    </div>
  )
}
