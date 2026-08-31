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
  count: 20_000,
  radius: 4.5,
  radiusLag: 1.2,
  size: 0.02,
  branches: 4,
  randomness: 0.5,
  randomnessPower: 2.6,
  yRadiusOffset: 1,
  rotationSpeed: -0.15,
  bandBoundaries: [1 / 3, 2 / 3],
  tiltFactors: [1, 0.6, 0.3],
  maxTilt: 0.25,
  tiltDamping: 3,
  baseTilt: (0 * Math.PI) / 180,
  baseTiltZ: (-30 * Math.PI) / 180,
  offset: { x: -3.4, y: 1, z: 4.3 },
  innerColor: '#ff6b00',
  midColor: '#d946ef',
  outerColor: '#00e5ff',
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

const BRANCH_ANGLES = [0, 1.43, 3.05, 4.78] // e.g. 4 arms at varying angular spacing: 0°, 82°, 175°, 274°

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
    const branchAngle =
      BRANCH_ANGLES[i % BRANCH_ANGLES.length] ??
      ((i % branches) / branches) * Math.PI * 2

    const randomPow = () => Math.pow(random(), randomnessPower)
    const randomSignX = random() < 0.5 ? -1 : 1
    const randomSignY = random() < 0.5 ? -1 : 1
    const randomSignZ = random() < 0.5 ? -1 : 1

    const randomX = randomPow() * randomSignX * randomness * particleRadius
    const randomY =
      randomPow() * randomSignY * randomness * particleRadius +
      particleRadius * yRadiusOffset
    const randomZ = randomPow() * randomSignZ * randomness * particleRadius

    const idx = i * 3
    positions[idx] =
      particleRadius * Math.sin(branchAngle + radiusLagAngle) + randomX
    positions[idx + 1] = randomY
    positions[idx + 2] =
      particleRadius * Math.cos(branchAngle + radiusLagAngle) + randomZ

    const t = particleRadius / radius
    let r: number, g: number, b: number
    if (t < 0.5) {
      const localT = t * 2
      r = innerColor.r + (midColor.r - innerColor.r) * localT
      g = innerColor.g + (midColor.g - innerColor.g) * localT
      b = innerColor.b + (midColor.b - innerColor.b) * localT
    } else {
      const localT = (t - 0.5) * 2
      r = midColor.r + (outerColor.r - midColor.r) * localT
      g = midColor.g + (outerColor.g - midColor.g) * localT
      b = midColor.b + (outerColor.b - midColor.b) * localT
    }
    const brightness = random() > 0.9 ? 1.8 : 0.8 + random() * 0.4
    colors[idx] = r * brightness
    colors[idx + 1] = g * brightness
    colors[idx + 2] = b * brightness
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
