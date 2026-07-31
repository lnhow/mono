import { describe, expect, it } from 'vitest'

import { buildGalaxyBands, GALAXY_PARAMS, resolveBandIndex } from './galaxy'

const TEST_PARAMS: typeof GALAXY_PARAMS = {
  ...GALAXY_PARAMS,
  count: 3000,
  innerColor: '#ff0000',
  outerColor: '#0000ff',
}

/** Deterministic LCG so particle assertions are stable. */
function createSeededRandom(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

describe('resolveBandIndex', () => {
  it.each([
    [0, 0],
    [0.33, 0],
    [0.34, 1],
    [0.66, 1],
    [0.67, 2],
    [1, 2],
  ])('maps radius fraction %s to band %s', (fraction, expected) => {
    expect(resolveBandIndex(fraction * 5, 5, [1 / 3, 2 / 3])).toBe(expected)
  })
})

describe('buildGalaxyBands', () => {
  const bands = buildGalaxyBands(TEST_PARAMS, createSeededRandom(42))

  it('creates three bands with matching position/color lengths', () => {
    expect(bands).toHaveLength(3)
    for (const band of bands) {
      expect(band.positions.length).toBe(band.colors.length)
      expect(band.positions.length % 3).toBe(0)
    }
  })

  it('preserves the total particle count across bands', () => {
    const total = bands.reduce((sum, band) => sum + band.positions.length / 3, 0)
    expect(total).toBe(TEST_PARAMS.count)
  })

  it('distributes particles roughly uniformly across bands', () => {
    for (const band of bands) {
      const count = band.positions.length / 3
      expect(count).toBeGreaterThan(TEST_PARAMS.count / 3 - 150)
      expect(count).toBeLessThan(TEST_PARAMS.count / 3 + 150)
    }
  })

  it('encodes radius as an inner-to-outer color lerp within each band range', () => {
    const ranges: ReadonlyArray<readonly [number, number]> = [
      [0, 0.7 / 3],
      [0.7 / 3, 1.4 / 3],
      [1.4 / 3, 0.7 + 1e-6],
    ]
    bands.forEach((band, bandIndex) => {
      const [min, max] = ranges[bandIndex]!
      for (let i = 0; i < band.colors.length; i += 3) {
        const r = band.colors[i]!
        const g = band.colors[i + 1]!
        const b = band.colors[i + 2]!
        expect(Math.abs(r + b - 1)).toBeLessThan(1e-6)
        expect(g).toBe(0)
        expect(b).toBeGreaterThanOrEqual(min)
        expect(b).toBeLessThan(max)
      }
    })
  })
})
