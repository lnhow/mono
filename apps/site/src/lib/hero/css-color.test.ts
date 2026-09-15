// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  GALAXY_INNER_FALLBACK,
  parseColorString,
  resolveCssColor,
} from './css-color'

describe('parseColorString', () => {
  it.each<[string, [number, number, number]]>([
    ['#ff4c40', [1, 76 / 255, 64 / 255]],
    ['rgb(255, 0, 128)', [1, 0, 128 / 255]],
    ['rgba(0, 255, 255, 0.5)', [0, 1, 1]],
  ])('parses %s', (input, expected) => {
    const parsed = parseColorString(input)
    expect(parsed).not.toBeNull()
    expected.forEach((channel, index) => {
      expect(parsed![index]).toBeCloseTo(channel, 5)
    })
  })

  it('returns null for non-sRGB strings', () => {
    expect(parseColorString('oklch(0.8138 0.1475 79.72)')).toBeNull()
    expect(parseColorString('')).toBeNull()
  })
})

describe('resolveCssColor', () => {
  afterEach(() => vi.restoreAllMocks())

  it('returns the fallback when the property is missing', () => {
    expect(resolveCssColor('--does-not-exist', GALAXY_INNER_FALLBACK)).toBe(
      GALAXY_INNER_FALLBACK,
    )
  })

  it('parses rgb values when canvas 2d is unavailable (jsdom)', () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: () => 'rgb(10, 20, 30)',
    } as unknown as CSSStyleDeclaration)
    const resolved = resolveCssColor('--test-color', GALAXY_INNER_FALLBACK)
    expect(resolved[0]).toBeCloseTo(10 / 255, 5)
    expect(resolved[1]).toBeCloseTo(20 / 255, 5)
    expect(resolved[2]).toBeCloseTo(30 / 255, 5)
  })

  it('returns the fallback for values nothing can parse', () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: () => 'oklch(0.8138 0.1475 79.72)',
    } as unknown as CSSStyleDeclaration)
    expect(resolveCssColor('--signal-amber', GALAXY_INNER_FALLBACK)).toBe(
      GALAXY_INNER_FALLBACK,
    )
  })
})
