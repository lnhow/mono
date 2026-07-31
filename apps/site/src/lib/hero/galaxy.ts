/**
 * Pure galaxy particle math, ported 1:1 from
 * apps/learn/threejs/basics/src/18-galaxy/script.ts.
 * Kept free of three.js so it stays unit-testable in plain node.
 */

export type RgbColor = readonly [number, number, number]

export interface GalaxyParams {
  readonly count: number
  readonly radius: number
  readonly radiusLag: number
  readonly size: number
  readonly branches: number
  readonly randomness: number
  readonly randomnessPower: number
  readonly yRadiusOffset: number
  readonly rotationSpeed: number
  /** Fractions of radius where inner/mid and mid/outer bands split. */
  readonly bandBoundaries: readonly number[]
  /** Cursor-tilt multiplier per band, inner to outer. */
  readonly tiltFactors: readonly number[]
  /** Maximum cursor tilt in radians (applied to the inner band). */
  readonly maxTilt: number
  /** Damping lambda for cursor-tilt easing. */
  readonly tiltDamping: number
  /** Resting tilt about x (30deg) so the disc slightly faces the screen. */
  readonly baseTilt: number
  /** Scene-space offset of the galaxy center. */
  readonly offset: { readonly x: number; readonly y: number; readonly z: number }
}

export const GALAXY_PARAMS: GalaxyParams = {
  count: 100_000,
  radius: 5,
  radiusLag: 1,
  size: 0.01,
  branches: 5,
  randomness: 0.45,
  randomnessPower: 2.6,
  yRadiusOffset: 0.45,
  rotationSpeed: -0.5,
  bandBoundaries: [1 / 3, 2 / 3],
  tiltFactors: [1, 0.6, 0.3],
  maxTilt: 0.08,
  tiltDamping: 3,
  baseTilt: Math.PI / 6,
  offset: { x: 3, y: 0, z: 0 },
}

export interface GalaxyBand {
  positions: Float32Array
  colors: Float32Array
}

export function resolveBandIndex(
  particleRadius: number,
  galaxyRadius: number,
  bandBoundaries: readonly number[],
): number {
  const first = bandBoundaries[0]! * galaxyRadius
  const second = bandBoundaries[1]! * galaxyRadius
  if (particleRadius < first) return 0
  if (particleRadius < second) return 1
  return 2
}

export function buildGalaxyBands(
  innerColor: RgbColor,
  outerColor: RgbColor,
  params: GalaxyParams = GALAXY_PARAMS,
  random: () => number = Math.random,
): GalaxyBand[] {
  const {
    count,
    radius,
    radiusLag,
    branches,
    randomness,
    randomnessPower,
    yRadiusOffset,
    bandBoundaries,
  } = params

  const radii = new Float32Array(count)
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const particleRadius = random() * radius
    radii[i] = particleRadius
    const radiusLagAngle = particleRadius * radiusLag
    const branchAngle = ((i % branches) / branches) * Math.PI * 2

    const randomX =
      Math.pow(random(), randomnessPower) *
      (random() < 0.5 ? -1 : 1) *
      randomness *
      particleRadius
    const randomY =
      Math.pow(random(), randomnessPower) *
        (random() < 0.5 ? -1 : 1) *
        randomness *
        particleRadius +
      particleRadius * yRadiusOffset
    const randomZ =
      Math.pow(random(), randomnessPower) *
      (random() < 0.5 ? -1 : 1) *
      randomness *
      particleRadius

    positions[i * 3] =
      particleRadius * Math.sin(branchAngle + radiusLagAngle) + randomX
    positions[i * 3 + 1] = randomY
    positions[i * 3 + 2] =
      particleRadius * Math.cos(branchAngle + radiusLagAngle) + randomZ

    const t = (particleRadius * 0.7) / radius
    colors[i * 3] = innerColor[0] + (outerColor[0] - innerColor[0]) * t
    colors[i * 3 + 1] = innerColor[1] + (outerColor[1] - innerColor[1]) * t
    colors[i * 3 + 2] = innerColor[2] + (outerColor[2] - innerColor[2]) * t
  }

  const bandCounts = [0, 0, 0]
  for (let i = 0; i < count; i++) {
    bandCounts[resolveBandIndex(radii[i]!, radius, bandBoundaries)]! += 1
  }

  const bands: GalaxyBand[] = bandCounts.map((bandCount) => ({
    positions: new Float32Array(bandCount * 3),
    colors: new Float32Array(bandCount * 3),
  }))
  const cursors = [0, 0, 0]

  for (let i = 0; i < count; i++) {
    const bandIndex = resolveBandIndex(radii[i]!, radius, bandBoundaries)
    const target = cursors[bandIndex]! * 3
    const source = i * 3
    bands[bandIndex]!.positions[target] = positions[source]!
    bands[bandIndex]!.positions[target + 1] = positions[source + 1]!
    bands[bandIndex]!.positions[target + 2] = positions[source + 2]!
    bands[bandIndex]!.colors[target] = colors[source]!
    bands[bandIndex]!.colors[target + 1] = colors[source + 1]!
    bands[bandIndex]!.colors[target + 2] = colors[source + 2]!
    cursors[bandIndex]! += 1
  }

  return bands
}
