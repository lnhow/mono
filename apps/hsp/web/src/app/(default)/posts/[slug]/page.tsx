import { allPosts } from 'content-collections'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXContent } from '@content-collections/mdx/react'

import { mdxComponents } from '@/mdx-components'
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
    // Recommended max width for comfortable reading is 65-75 characters
    <div className="mx-auto my-8 [--w-content:75ch]">
      <header className="flex gap-6">
        <div className="border-b border-base-500 flex-1 max-w-full">
          <div className='mx-auto w-(--w-content) max-w-full'>
            <div className="font-mono text-sm text-fore-200">
              <time dateTime={post.createdAt.toISOString()}>{displayDate}</time>
              {post.readingTime && (
                <>
                  <span> • </span>
                  <span>{Math.ceil(post.readingTime)} min read</span>
                </>
              )}
            </div>
            {post.updatedAt && (
              <div className="font-mono text-xs text-fore-200 mt-2">
                (Updated:{' '}
                <time dateTime={post.updatedAt.toISOString()}>
                  {post.updatedAt.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                )
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-semibold mt-6 mb-3 text-fore-400">
              {post.title}
            </h1>
            <div>
              {post.tags?.length && (
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-fore-200 font-mono">
                  {post.tags?.map((tag) => (
                    <span key={tag}>#{tag.toLowerCase()}</span>
                  ))}
                </div>
              )}
              <p className="text-md text-fore-200 break-words">
                {post.description}
              </p>
            </div>
          </div>
        </div>
        <div className="basis-xs hidden lg:block min-w-60">&nbsp;</div>
      </header>
      <div className="flex gap-6 mt-8">
        <main className="prose prose-neutral dark:prose-invert lg:prose-lg mx-auto max-md:max-w-full">
          <MarkdownTypography className="w-(--w-content) max-w-full">
            <MDXContent code={post.mdx} components={mdxComponents} />
          </MarkdownTypography>
        </main>
        <div className="basis-xs min-w-60 hidden lg:block outline outline-base-200 p-4 rounded">
          {/* TODO (haoln): Add TOC support */}
        </div>
      </div>
    </div>
  )
}
