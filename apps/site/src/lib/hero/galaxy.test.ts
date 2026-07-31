import { describe, expect, it } from 'vitest'

import { buildGalaxyBands, GALAXY_PARAMS, resolveBandIndex } from './galaxy'

const TEST_PARAMS: typeof GALAXY_PARAMS = {
  ...GALAXY_PARAMS,
  count: 3000,
  innerColor: '#ff0000',
  midColor: '#00ff00',
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

  it('encodes radius as a two-stop inner→mid→outer color lerp', () => {
    bands.forEach((band, bandIndex) => {
      for (let i = 0; i < band.colors.length; i += 3) {
        const r = band.colors[i]!
        const g = band.colors[i + 1]!
        const b = band.colors[i + 2]!
        if (bandIndex === 0) {
          expect(b).toBe(0)
          expect(r + g).toBeGreaterThan(0.99)
        } else if (bandIndex === 2) {
          expect(r).toBe(0)
          expect(g + b).toBeGreaterThan(0.99)
        }
      }
    })
  })
})
