import { describe, expect, it } from 'vitest'

import { getPostTransitionNames } from './post-transitions'

describe('getPostTransitionNames', () => {
  it('returns stable names shared by cards and post pages', () => {
    expect(getPostTransitionNames('251008-the-first-post')).toEqual({
      card: 'post-251008-the-first-post',
      title: 'post-title-251008-the-first-post',
      description: 'post-description-251008-the-first-post',
      stats: 'post-stats-251008-the-first-post',
      tags: 'post-tags-251008-the-first-post',
    })
  })
})
