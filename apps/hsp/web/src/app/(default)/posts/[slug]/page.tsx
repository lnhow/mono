import { allPosts } from 'content-collections'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXContent } from '@content-collections/mdx/react'

import MarkdownTypography from '@hsp/ui/src/components/mdx/typography'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params

  const post = allPosts.find((post) => post.slug === slug)
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  // TODO (haoln): Add open graph image support
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime:
        post.updatedAt?.toISOString() || post.createdAt.toISOString(),
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

  const post = allPosts.find((post) => post.slug === slug)
  if (!post) {
    notFound()
  }

  const displayDate = post.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="mx-auto my-8">
      <header className='border-b border-base-500 pb-4'>
        <div className="flex items-center gap-4 flex-wrap font-mono text-sm text-fore-200">
          <time dateTime={post.createdAt.toISOString()}>{displayDate}</time>
          {post.updatedAt && (
            <>
              <span>
                (Updated:{' '}
                {post.updatedAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
                )
              </span>
            </>
          )}
          {post.readingTime && (
            <>
              <span>•</span>
              <span>{Math.ceil(post.readingTime)} min read</span>
            </>
          )}
        </div>
        <h1 className="text-3xl font-semibold mt-3 mb-3 text-fore-400">
          {post.title}
        </h1>
        <div>
          <p className="text-lg text-fore-400 break-words">{post.description}</p>
          {post.tags?.length && (
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-fore-200 font-mono">
              {post.tags?.map((tag) => (
                <span key={tag}>
                  #{tag.toLowerCase()}
                </span>
              ))}
            </div>
            )}
        </div>
      </header>
      <div className='flex gap-6 mt-8'>
        <main className="prose prose-neutral dark:prose-invert lg:prose-lg max-w-[80ch] mx-auto">
          <MarkdownTypography>
            <MDXContent code={post.mdx} />
          </MarkdownTypography>
        </main>
        <div className='basis-xs hidden lg:block outline outline-base-200 p-4 rounded'>
          {/* TODO (haoln): Add TOC support */}
        </div>
      </div>
    </div>
  )
}
