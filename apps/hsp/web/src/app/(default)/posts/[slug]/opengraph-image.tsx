import { PostUtils } from '@hsp/ui/modules/posts/utils'
import { allPosts } from 'content-collections'
import { notFound } from 'next/navigation'
// import { NextRequest } from 'next/server'
import { generateImage } from '../../../(api)/og/_og.service'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Generate static paths at build time
export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Image({
  params,
}: {
  params: Promise<{
    slug: string
  }>
}) {
  const { slug } = await params
  const post = allPosts.find((post) => {
    if (!PostUtils.shouldShow(post.draft)) {
      return false
    }
    return post.slug === slug
  })

  if (!post) {
    return notFound()
  }

  const title = post?.title || 'Hao Le'
  const description =
    post?.description || 'Web Developer. Photography and UX Enthusiast.'

  return generateImage({
    title,
    description,
    style: {
      h1: { fontSize: title.length > 50 ? '3rem' : '5rem' },
      h2: { fontSize: description.length > 100 ? '1.5rem' : '1.75rem' },
      container: { padding: title.length > 50 ? '5rem' : '10rem' },
    },
  })
}
