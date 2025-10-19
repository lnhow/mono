import { allPosts } from 'content-collections'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXContent } from '@content-collections/mdx/react'

import { mdxComponents } from '@/mdx-components'
import MarkdownTypography from '@hsp/ui/src/components/mdx/typography'
import TableOfContents from '@hsp/ui/src/components/mdx/toc'
import { PostUtils } from '@hsp/ui/src/modules/posts/utils'
import ViewTransition from '@hsp/ui/src/utils/react/view-transition'
import { PostTags } from '@hsp/ui/src/modules/posts/card'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

const getPost = (slug: string) => {
  return allPosts.find((post) => {
    if (!PostUtils.shouldShow(post.draft)) {
      return false
    }
    return post.slug === slug
  })
}

// Generate static paths at build time
export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params

  const post = getPost(slug)
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const ogImageSearchParams = new URLSearchParams()
  ogImageSearchParams.set('title', post.title)
  ogImageSearchParams.set('description', post.description || '')

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: ['/og?' + ogImageSearchParams.toString()],
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

  const post = getPost(slug)
  if (!post) {
    notFound()
  }

  const createdDate = PostUtils.formatDate(post.createdAt)
  const updatedDate = post.updatedAt
    ? PostUtils.formatDate(post.updatedAt)
    : null
  const toc = post.toc ? JSON.parse(post.toc) : []
  const transitionName = PostUtils.getTransitionName(slug)

  return (
    // Recommended max width for comfortable reading is 65-75 characters
    <div className="mx-auto my-8 [--w-content:75ch]">
      <header className="flex gap-8 text-fore-200">
        <ViewTransition name={transitionName.card} update="none">
          <div className="flex-1 max-w-full pb-6">
            <div className="mx-auto w-(--w-content) max-w-full">
              <ViewTransition name={transitionName.stats}>
                <div className="font-mono text-sm">
                  <time dateTime={post.createdAt.toISOString()}>
                    {createdDate}
                  </time>
                  {post.readingTime && (
                    <>
                      <span> • </span>
                      <span>{Math.ceil(post.readingTime)} min read</span>
                    </>
                  )}
                </div>
              </ViewTransition>
              {post.updatedAt && (
                <div className="font-mono text-xs mt-2">
                  (Updated:{' '}
                  <time dateTime={post.updatedAt.toISOString()}>
                    {updatedDate}
                  </time>
                  )
                </div>
              )}
              <ViewTransition name={transitionName.title}>
                <h1 className="text-3xl md:text-4xl font-semibold mt-6 mb-3 text-fore-400">
                  {post.title}
                </h1>
              </ViewTransition>
              <div>
                <PostTags
                  tags={post.tags || []}
                  transitionName={transitionName.tag}
                  className="mt-2"
                />
                {/* {post.tags?.length && (
                  <ViewTransition name={transitionName.tag}>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs font-mono">
                      {post.tags?.map((tag) => (
                        <span key={tag}>#{tag.toLowerCase()}</span>
                      ))}
                    </div>
                  </ViewTransition>
                )} */}
                <ViewTransition name={transitionName.description}>
                  <p className="text-md break-words mt-4">{post.description}</p>
                </ViewTransition>
              </div>
            </div>
          </div>
        </ViewTransition>
        <div className="basis-xs hidden lg:block min-w-60">&nbsp;</div>
      </header>
      <div className="flex gap-8 mt-8 relative text-fore-200">
        <main className="prose prose-neutral dark:prose-invert lg:prose-lg mx-auto max-md:max-w-full">
          <MarkdownTypography className="w-(--w-content) max-w-full break-words">
            <MDXContent code={post.mdx} components={mdxComponents} />
          </MarkdownTypography>
        </main>
        <div className="basis-xs hidden lg:block min-w-60 sticky top-20 max-h-[calc(100vh-var(--spacing)*20)]">
          <TableOfContents
            toc={toc}
            className="max-h-[50vh] overflow-auto p-6"
          />
        </div>
      </div>
    </div>
  )
}
