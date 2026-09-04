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
  count: 4_000,
  radius: 5,
  radiusLag: 1.7,
  size: 0.01,
  branches: 4,
  randomness: 0.75,
  randomnessPower: 5,
  yRadiusOffset: 1,
  rotationSpeed: -0.1,
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

export function buildGalaxyBands(
  params: GalaxyParams = GALAXY_PARAMS,
  random: () => number = Math.random,
): GalaxyBand[] {
  const {
    count,
    branches,
    radius,
    radiusLag,
    randomness,
    randomnessPower,
    yRadiusOffset,
    bandBoundaries,
  } = params

  const inner = new THREE.Color(params.innerColor)
  const mid = new THREE.Color(params.midColor)
  const outer = new THREE.Color(params.outerColor)

  const positions: number[][] = [[], [], []]
  const colors: number[][] = [[], [], []]

  for (let i = 0; i < count; i++) {
    const particleRadius = random() * radius
    const bandIndex = resolveBandIndex(particleRadius, radius, bandBoundaries)
    const branchAngle = ((i % branches) / branches) * Math.PI * 2
    const angle = branchAngle + particleRadius * radiusLag

    const randPow = () => Math.pow(random(), randomnessPower)
    const signX = random() < 0.5 ? -1 : 1
    const signY = random() < 0.5 ? -1 : 1
    const signZ = random() < 0.5 ? -1 : 1

    const x =
      particleRadius * Math.sin(angle) +
      randPow() * signX * randomness * particleRadius
    const y =
      randPow() * signY * randomness * particleRadius +
      particleRadius * yRadiusOffset
    const z =
      particleRadius * Math.cos(angle) +
      randPow() * signZ * randomness * particleRadius

    positions[bandIndex]!.push(x, y, z)

    // Two-stop color gradient: inner -> mid -> outer
    const t = particleRadius / radius
    const isInner = t < 0.5
    const localT = isInner ? t * 2 : (t - 0.5) * 2
    const from = isInner ? inner : mid
    const to = isInner ? mid : outer
    const brightness = random() > 0.9 ? 1.8 : 0.8 + random() * 0.4

    colors[bandIndex]!.push(
      (from.r + (to.r - from.r) * localT) * brightness,
      (from.g + (to.g - from.g) * localT) * brightness,
      (from.b + (to.b - from.b) * localT) * brightness,
    )
  }

  return positions.map((pos, i) => ({
    positions: new Float32Array(pos),
    colors: new Float32Array(colors[i]!),
  }))
}
