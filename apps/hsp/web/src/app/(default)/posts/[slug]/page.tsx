import { allPosts } from 'content-collections'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXContent } from '@content-collections/mdx/react'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params
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
      modifiedTime: post.updatedAt?.toISOString() || post.createdAt.toISOString(),
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

  return (
    <article className="prose prose-neutral dark:prose-invert lg:prose-lg mx-auto my-8">
      <h1>{post.title}</h1>
      <p className="text-sm text-gray-500">
        Published on {post.createdAt.toDateString()}
        {post.updatedAt && ` · Updated on ${post.updatedAt.toDateString()}`}
      </p>
      <div className="mt-4">
        <MDXContent code={post.mdx} />
      </div>
    </article>
  )
}
