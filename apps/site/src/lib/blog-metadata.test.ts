import { describe, expect, it } from 'vitest'

import { blogMetadata } from './blog-metadata'

describe('blog metadata', () => {
  it('identifies the blog in social metadata', () => {
    expect(blogMetadata.openGraph).toMatchObject({
      title: 'Blog',
      description: 'Writing about software, learning, and personal reflections.',
      url: '/blog',
    })
    expect(blogMetadata.twitter).toMatchObject({
      title: 'Blog',
      description: 'Writing about software, learning, and personal reflections.',
    })
  })
})
