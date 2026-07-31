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
      baseTiltGroup.rotation.set(GALAXY_PARAMS.baseTilt, 0, 0)
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
