'use client'

import { useEffect, useRef, type RefObject } from 'react'
import * as THREE from 'three'

import {
  GALAXY_INNER_FALLBACK,
  GALAXY_OUTER_FALLBACK,
  resolveCssColor,
} from '@/lib/hero/css-color'
import { buildGalaxyBands, GALAXY_PARAMS } from '@/lib/hero/galaxy'

export interface GalaxyTiltTarget {
  x: number
  y: number
}

interface GalaxyCanvasProps {
  tiltTarget: RefObject<GalaxyTiltTarget>
}

const BLINK_COUNT = 3000
const BLINK_SPEED = 2.2
const BLINK_COLORS: ReadonlyArray<readonly [number, number, number]> = [
  [1, 0.15, 0.05],
  [0.1, 1, 0.15],
  [0.05, 0.2, 1],
]

interface Blinker {
  bandIndex: number
  localIndex: number
  originalR: number
  originalG: number
  originalB: number
  blinkR: number
  blinkG: number
  blinkB: number
  phase: number
}

export function GalaxyCanvas({ tiltTarget }: GalaxyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = containerRef.current
    if (!parent) return

    const aspect = window.innerWidth / window.innerHeight
    const offsetScale = Math.min(1, aspect / 1.2)
    const offsetX = GALAXY_PARAMS.offset.x * offsetScale
    const offsetY = GALAXY_PARAMS.offset.y
    const offsetZ = GALAXY_PARAMS.offset.z

    const innerColor = resolveCssColor('--signal-amber', GALAXY_INNER_FALLBACK)
    const outerColor = resolveCssColor('--signal-blue', GALAXY_OUTER_FALLBACK)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      75,
      parent.clientWidth / Math.max(parent.clientHeight, 1),
      0.1,
      100,
    )
    camera.position.set(0, 8, 8)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(parent.clientWidth, parent.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.NoToneMapping

    const bands = buildGalaxyBands(innerColor, outerColor)
    const geometries = bands.map((band) => {
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(band.positions, 3),
      )
      geometry.setAttribute('color', new THREE.BufferAttribute(band.colors, 3))
      return geometry
    })

    const blinkerRefs: THREE.BufferAttribute[] = geometries.map(
      (g) => g.attributes.color as THREE.BufferAttribute,
    )

    const bandCounts = bands.map((b) => b.positions.length / 3)
    const totalParticles = bandCounts.reduce((a, b) => a + b, 0)

    const blinkIndices = new Set<number>()
    while (blinkIndices.size < BLINK_COUNT) {
      blinkIndices.add(Math.floor(Math.random() * totalParticles))
    }

    const blinkers: Blinker[] = []
    let cursor = 0
    for (const globalIndex of blinkIndices) {
      let remaining = globalIndex
      let bandIndex = 0
      while (bandIndex < bandCounts.length && remaining >= bandCounts[bandIndex]!) {
        remaining -= bandCounts[bandIndex]!
        bandIndex++
      }
      const localIndex = remaining
      const attr = blinkerRefs[bandIndex]!
      const oR = attr.array[localIndex * 3]!
      const oG = attr.array[localIndex * 3 + 1]!
      const oB = attr.array[localIndex * 3 + 2]!
      const blinkColor = BLINK_COLORS[cursor % BLINK_COLORS.length]!

      blinkers.push({
        bandIndex,
        localIndex,
        originalR: oR,
        originalG: oG,
        originalB: oB,
        blinkR: blinkColor[0],
        blinkG: blinkColor[1],
        blinkB: blinkColor[2],
        phase: Math.random() * Math.PI * 2,
      })
      cursor++
    }

    const material = new THREE.PointsMaterial({
      size: GALAXY_PARAMS.size,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const tiltGroups: THREE.Group[] = []
    const spinGroups: THREE.Group[] = []
    const root = new THREE.Group()

    for (const geometry of geometries) {
      const tiltGroup = new THREE.Group()
      tiltGroup.position.set(offsetX, offsetY, offsetZ)
      const baseTiltGroup = new THREE.Group()
      baseTiltGroup.rotation.set(GALAXY_PARAMS.baseTilt, 0, GALAXY_PARAMS.baseTiltZ)
      const spinGroup = new THREE.Group()
      const points = new THREE.Points(geometry, material)
      spinGroup.add(points)
      baseTiltGroup.add(spinGroup)
      tiltGroup.add(baseTiltGroup)
      root.add(tiltGroup)
      tiltGroups.push(tiltGroup)
      spinGroups.push(spinGroup)
    }

    scene.add(root)

    const tilt = { x: 0, y: 0 }
    let animationFrameId = 0
    const startTime = performance.now()

    const preferredMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    function animate() {
      animationFrameId = requestAnimationFrame(animate)

      if (preferredMotion) return

      const elapsed = (performance.now() - startTime) / 1000
      const spin = elapsed * GALAXY_PARAMS.rotationSpeed

      tilt.x = THREE.MathUtils.damp(
        tilt.x,
        tiltTarget.current?.y ?? 0,
        GALAXY_PARAMS.tiltDamping,
        0.016,
      )
      tilt.y = THREE.MathUtils.damp(
        tilt.y,
        tiltTarget.current?.x ?? 0,
        GALAXY_PARAMS.tiltDamping,
        0.016,
      )

      for (const group of spinGroups) group.rotation.y = spin
      tiltGroups.forEach((group, index) => {
        const factor = GALAXY_PARAMS.tiltFactors[index] ?? 1
        group.rotation.x = tilt.x * GALAXY_PARAMS.maxTilt * factor
        group.rotation.z = -tilt.y * GALAXY_PARAMS.maxTilt * factor
      })

      for (const blinker of blinkers) {
        const attr = blinkerRefs[blinker.bandIndex]!
        const i = blinker.localIndex * 3
        const t = (Math.sin(elapsed * BLINK_SPEED + blinker.phase) + 1) / 2
        // sharp attack, longer decay
        const intensity = Math.pow(t, 12)
        attr.array[i] = blinker.originalR + (blinker.blinkR - blinker.originalR) * intensity
        attr.array[i + 1] = blinker.originalG + (blinker.blinkG - blinker.originalG) * intensity
        attr.array[i + 2] = blinker.originalB + (blinker.blinkB - blinker.originalB) * intensity
      }
      for (const attr of blinkerRefs) attr.needsUpdate = true

      renderer.render(scene, camera)
    }

    if (preferredMotion) {
      renderer.render(scene, camera)
    } else {
      animate()
    }

    function onResize() {
      if (!parent) return
      const w = parent.clientWidth
      const h = parent.clientHeight
      camera.aspect = w / Math.max(h, 1)
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationFrameId)
      renderer.dispose()
      material.dispose()
      geometries.forEach((g) => g.dispose())
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas
        ref={(el) => { canvasRef.current = el }}
        aria-hidden="true"
        className="absolute inset-0 block h-full w-full"
      />
    </div>
  )
}
