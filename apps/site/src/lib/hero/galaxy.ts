/**
 * Pure galaxy particle math, ported 1:1 from
 * apps/learn/threejs/basics/src/18-galaxy/script.ts.
 */
import * as THREE from 'three'

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
  /** Resting tilt about z (80deg) so the galaxy leans left. */
  readonly baseTiltZ: number
  /** Scene-space offset of the galaxy center. */
  readonly offset: {
    readonly x: number
    readonly y: number
    readonly z: number
  }
  /** Hex or CSS color for the innermost particles. */
  readonly innerColor: string
  /** Hex or CSS color at the midpoint of the galaxy. */
  readonly midColor: string
  /** Hex or CSS color for the outermost particles. */
  readonly outerColor: string
}

export const GALAXY_PARAMS: GalaxyParams = {
  count: 15_000,
  radius: 5,
  radiusLag: 1.4,
  size: 0.01,
  branches: 4,
  randomness: 0.5,
  randomnessPower: 2.6,
  yRadiusOffset: 1,
  rotationSpeed: -0.1,
  bandBoundaries: [1 / 3, 2 / 3],
  tiltFactors: [1, 0.6, 0.3],
  maxTilt: 0.25,
  tiltDamping: 3,
  baseTilt: (0 * Math.PI) / 180,
  baseTiltZ: (-30 * Math.PI) / 180,
  offset: { x: -3.4, y: 1, z: 4.3 },
  innerColor: '#004069',
  midColor: '#05dcac',
  outerColor: '#19e0ff',
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

  const innerColor = new THREE.Color(params.innerColor)
  const midColor = new THREE.Color(params.midColor)
  const outerColor = new THREE.Color(params.outerColor)

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

    const t = particleRadius / radius
    let r: number, g: number, b: number
    if (t < 0.5) {
      const localT = t * 2
      r = THREE.MathUtils.lerp(innerColor.r, midColor.r, localT)
      g = THREE.MathUtils.lerp(innerColor.g, midColor.g, localT)
      b = THREE.MathUtils.lerp(innerColor.b, midColor.b, localT)
    } else {
      const localT = (t - 0.5) * 2
      r = THREE.MathUtils.lerp(midColor.r, outerColor.r, localT)
      g = THREE.MathUtils.lerp(midColor.g, outerColor.g, localT)
      b = THREE.MathUtils.lerp(midColor.b, outerColor.b, localT)
    }
    colors[i * 3] = r
    colors[i * 3 + 1] = g
    colors[i * 3 + 2] = b
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
