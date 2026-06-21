import { MDXContent } from '@content-collections/mdx/react'
import { Badge } from '@folio/ui/components/badge'
import { allPosts } from 'content-collections'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { mdxComponents } from '@/components/mdx-components'
import { getPostBySlug, getPostStaticParams } from '@/lib/posts'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getPostStaticParams(allPosts)
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(allPosts, slug)

  if (!post) {
    return { title: 'Post not found' }
  }

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: post.url },
    openGraph: {
      type: 'article',
      url: post.url,
      title: post.title,
      description: post.description,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: (post.updatedAt ?? post.createdAt).toISOString(),
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(allPosts, slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl">
      <header className="space-y-5 border-b pb-8">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <time dateTime={post.createdAt.toISOString()}>
            {new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
              post.createdAt,
            )}
          </time>
          <span aria-hidden="true">·</span>
          <span>{Math.max(1, Math.ceil(post.readingTime))} min read</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">{post.description}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </header>
      <div className="prose prose-neutral mt-10 max-w-none prose-headings:scroll-mt-20">
        <MDXContent code={post.mdx} components={mdxComponents} />
      </div>
    </article>
  )
}
