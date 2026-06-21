import { describe, expect, it } from 'vitest'

import {
  blogMetadata,
  createPostMetadata,
  homeMetadata,
  rootMetadata,
} from './site-metadata'
import { site } from './site'

const description =
  'Hao Le’s personal website. Web developer, photography and UX enthusiast.'

describe('root metadata', () => {
  it('sets the canonical identity, favicon, and thumbnail', () => {
    expect(rootMetadata).toMatchObject({
      metadataBase: new URL(site.origin),
      description,
      icons: {
        icon: '/icon.png',
        apple: '/apple-icon.png',
      },
      openGraph: {
        title: 'Hao Le',
        description,
        url: '/',
        images: [expect.stringContaining('/api/og?')],
      },
      twitter: {
        card: 'summary_large_image',
        images: [expect.stringContaining('/api/og?')],
      },
    })
  })
})

describe('page metadata', () => {
  it('defines home metadata with a custom thumbnail', () => {
    expect(homeMetadata).toMatchObject({
      title: 'Hao Le',
      alternates: { canonical: '/' },
      openGraph: { url: '/', images: [expect.stringContaining('/api/og?')] },
      twitter: { images: [expect.stringContaining('/api/og?')] },
    })
  })

  it('defines blog metadata with a custom thumbnail', () => {
    expect(blogMetadata).toMatchObject({
      title: 'Blog',
      alternates: { canonical: '/blog' },
      openGraph: {
        url: '/blog',
        images: [expect.stringContaining('/api/og?')],
      },
      twitter: { images: [expect.stringContaining('/api/og?')] },
    })
  })

  it('defines article metadata with canonical dates, tags, and thumbnail', () => {
    const metadata = createPostMetadata({
      slug: 'example',
      url: '/posts/example',
      title: 'Example title',
      description: 'Example description',
      createdAt: new Date('2025-01-01T00:00:00.000Z'),
      updatedAt: new Date('2025-01-02T00:00:00.000Z'),
      tags: ['testing'],
    })

    expect(metadata).toMatchObject({
      title: 'Example title',
      alternates: { canonical: '/posts/example' },
      openGraph: {
        type: 'article',
        url: '/posts/example',
        publishedTime: '2025-01-01T00:00:00.000Z',
        modifiedTime: '2025-01-02T00:00:00.000Z',
        tags: ['testing'],
        images: [expect.stringContaining('/api/og?')],
      },
      twitter: { images: [expect.stringContaining('/api/og?')] },
    })
  })

  it('returns minimal metadata for a missing post', () => {
    expect(createPostMetadata()).toEqual({ title: 'Post not found' })
  })
})
