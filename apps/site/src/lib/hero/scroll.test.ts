import { describe, expect, it } from 'vitest'

import { clampScrollPosition, formatPixelPosition } from './scroll'

describe('clampScrollPosition', () => {
  it.each([
    [-20, 3000, 1000, 0],
    [1000, 3000, 1000, 1000],
    [9000, 3000, 1000, 2000],
    [200, 800, 1000, 0],
  ])(
    'clamps %s for document %s and viewport %s',
    (value, height, viewport, expected) => {
      expect(clampScrollPosition(value, height, viewport)).toBe(expected)
    },
  )
})

describe('formatPixelPosition', () => {
  it.each([
    [0, '0 px'],
    [999, '999 px'],
    [1234, '1.2k px'],
    [1234567, '1.2m px'],
  ])('formats %s as %s', (value, expected) => {
    expect(formatPixelPosition(value)).toBe(expected)
  })
})
