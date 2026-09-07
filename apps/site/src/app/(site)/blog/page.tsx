import { allPosts } from 'content-collections'
import type { Metadata } from 'next'

import { PostCard } from './_components/post-card'
import { getVisiblePosts } from '@/lib/posts'
import { blogMetadata } from '@/lib/site-metadata'

export const metadata: Metadata = blogMetadata

export default function BlogPage() {
  const posts = getVisiblePosts(allPosts)

  return (
    <section className="space-y-8">
      <header className="max-w-2xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Notes on software, learning, and the occasional reflection.
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
