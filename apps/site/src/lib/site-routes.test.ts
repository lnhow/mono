import { describe, expect, it } from 'vitest'

import type { PostRecord } from './posts'
import { createRobots, createSitemap } from './site-routes'

const post = (overrides: Partial<PostRecord> = {}): PostRecord => ({
  slug: 'published',
  createdAt: new Date('2025-01-01T00:00:00.000Z'),
  url: '/blog/published',
  ...overrides,
})

describe('createSitemap', () => {
  it('uses normalized canonical URLs and excludes hidden posts', () => {
    const sitemap = createSitemap(
      [
        post(),
        post({ slug: 'draft', url: '/blog/draft', draft: true }),
        post({ slug: 'archived', url: '/blog/archived', archived: true }),
      ],
      'https://preview.example.com/path/',
    )

    expect(sitemap.map(({ url }) => url)).toEqual([
      'https://preview.example.com',
      'https://preview.example.com/blog',
      'https://preview.example.com/blog/published',
    ])
  })
})

describe('createRobots', () => {
  it('allows crawling and points to the canonical sitemap', () => {
    expect(createRobots('https://preview.example.com/path/')).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://preview.example.com/sitemap.xml',
    })
  })
})
