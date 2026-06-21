import { describe, expect, it } from 'vitest'

import {
  getPostBySlug,
  getPostStaticParams,
  getVisiblePosts,
  type PostRecord,
} from './posts'

const post = (overrides: Partial<PostRecord> = {}): PostRecord => ({
  slug: 'published',
  createdAt: new Date('2025-01-01T00:00:00.000Z'),
  ...overrides,
})

describe('getVisiblePosts', () => {
  it('excludes draft and archived posts', () => {
    const posts = [
      post(),
      post({ slug: 'draft', draft: true }),
      post({ slug: 'archived', archived: true }),
    ]

    expect(getVisiblePosts(posts).map(({ slug }) => slug)).toEqual([
      'published',
    ])
  })

  it('sorts by effective date without mutating the input', () => {
    const posts = [
      post({ slug: 'newer-created', createdAt: new Date('2025-02-01') }),
      post({
        slug: 'older-updated',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2025-03-01'),
      }),
    ]

    expect(getVisiblePosts(posts).map(({ slug }) => slug)).toEqual([
      'older-updated',
      'newer-created',
    ])
    expect(posts.map(({ slug }) => slug)).toEqual([
      'newer-created',
      'older-updated',
    ])
  })

  it('uses creation date then slug as deterministic tie-breakers', () => {
    const effectiveDate = new Date('2025-03-01')
    const posts = [
      post({ slug: 'bravo', createdAt: new Date('2025-01-01'), updatedAt: effectiveDate }),
      post({ slug: 'charlie', createdAt: new Date('2025-02-01'), updatedAt: effectiveDate }),
      post({ slug: 'alpha', createdAt: new Date('2025-01-01'), updatedAt: effectiveDate }),
    ]

    expect(getVisiblePosts(posts).map(({ slug }) => slug)).toEqual([
      'charlie',
      'alpha',
      'bravo',
    ])
  })
})

describe('post routing helpers', () => {
  it('does not return hidden posts by slug', () => {
    expect(getPostBySlug([post({ slug: 'draft', draft: true })], 'draft')).toBeUndefined()
  })

  it('only creates route params for visible posts in sorted order', () => {
    expect(
      getPostStaticParams([
        post({ slug: 'older', createdAt: new Date('2024-01-01') }),
        post({ slug: 'newer', createdAt: new Date('2025-01-01') }),
        post({ slug: 'draft', draft: true }),
      ]),
    ).toEqual([{ slug: 'newer' }, { slug: 'older' }])
  })
})
