import { describe, expect, it } from 'vitest'

import { createThumbnailUrl, getThumbnailContent } from './thumbnail'

describe('thumbnail helpers', () => {
  it('creates an encoded API URL for custom metadata images', () => {
    expect(
      createThumbnailUrl({ title: 'Output & Outcome', description: 'A/B?' }),
    ).toBe(
      '/api/og?title=Output+%26+Outcome&description=A%2FB%3F',
    )
  })

  it('reads custom content and supplies stable defaults', () => {
    expect(getThumbnailContent(new URL('https://example.com/api/og'))).toEqual({
      title: 'Hao Le',
      description: 'Web developer, photography and UX enthusiast.',
    })

    expect(
      getThumbnailContent(
        new URL(
          'https://example.com/api/og?title=Custom&description=Description',
        ),
      ),
    ).toEqual({ title: 'Custom', description: 'Description' })
  })
})
