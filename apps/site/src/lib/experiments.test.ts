import { describe, expect, it } from 'vitest'

import { experiments } from './experiments'

describe('experiments', () => {
  it('contains the exact migrated experiment slugs', () => {
    const slugs = experiments.map(({ slug }) => slug)

    expect(slugs).toEqual([
      '3d-text',
      'cake',
      'physics',
      'spiral',
      'palette',
      'player',
      'contrast-checker',
      'nextjs-performance',
    ])
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('links to absolute HTTPS locations outside the stable route contract', () => {
    for (const experiment of experiments) {
      expect(new URL(experiment.href).protocol).toBe('https:')
      expect(experiment.href).toMatch(/^https:\/\/www\.haoln7f8\.com\//)
    }
  })

  it('uses a supported category', () => {
    const categories = new Set(['creative-coding', 'tools', 'performance'])

    for (const experiment of experiments) {
      expect(categories.has(experiment.category)).toBe(true)
    }
  })
})
