import { allPosts } from 'content-collections'
import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'

import { getPostBySlug, getPostStaticParams } from '@/lib/posts'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getPostStaticParams(allPosts)
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(allPosts, slug)

  if (!post) {
    notFound()
  }

  return new ImageResponse(
    <div
      style={{
        alignItems: 'flex-start',
        background: '#ffffff',
        color: '#171717',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        padding: '80px',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', fontSize: 28 }}>Hao Le · Blog</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 700 }}>
          {post.title}
        </div>
        <div style={{ color: '#525252', display: 'flex', fontSize: 30 }}>
          {post.description}
        </div>
      </div>
    </div>,
    size,
  )
}
