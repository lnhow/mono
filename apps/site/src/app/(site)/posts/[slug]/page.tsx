import { MDXContent } from '@content-collections/mdx/react'
import { Badge } from '@folio/ui/components/badge'
import { allPosts } from 'content-collections'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ViewTransition } from 'react'

import { mdxComponents } from '@/components/mdx-components'
import { getPostBySlug, getPostStaticParams } from '@/lib/posts'
import { createPostMetadata } from '@/lib/site-metadata'
import { getPostTransitionNames } from '@/lib/post-transitions'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getPostStaticParams(allPosts)
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(allPosts, slug)

  return createPostMetadata(post)
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(allPosts, slug)

  if (!post) {
    notFound()
  }

  const transitionNames = getPostTransitionNames(post.slug)

  return (
    <ViewTransition name={transitionNames.card} update="none">
      <article className="mx-auto max-w-3xl">
        <header className="space-y-5 border-b pb-8">
          <ViewTransition name={transitionNames.stats}>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <time dateTime={post.createdAt.toISOString()}>
                {new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'long',
                }).format(post.createdAt)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{Math.max(1, Math.ceil(post.readingTime))} min read</span>
            </div>
          </ViewTransition>
          <ViewTransition name={transitionNames.title}>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {post.title}
            </h1>
          </ViewTransition>
          <ViewTransition name={transitionNames.description}>
            <p className="text-lg leading-8 text-muted-foreground">
              {post.description}
            </p>
          </ViewTransition>
          <ViewTransition name={transitionNames.tags}>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </ViewTransition>
        </header>
        <div className="prose prose-neutral mt-10 max-w-none prose-headings:scroll-mt-20">
          <MDXContent code={post.mdx} components={mdxComponents} />
        </div>
      </article>
    </ViewTransition>
  )
}
