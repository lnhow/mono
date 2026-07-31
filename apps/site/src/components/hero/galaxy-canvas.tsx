'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type RefObject } from 'react'
import * as THREE from 'three'

import { buildGalaxyBands, GALAXY_PARAMS } from '@/lib/hero/galaxy'

export interface GalaxyTiltTarget {
  x: number
  y: number
}

interface GalaxyCanvasProps {
  tiltTarget: RefObject<GalaxyTiltTarget>
}

function GalaxyPoints({ tiltTarget }: { tiltTarget: RefObject<GalaxyTiltTarget> }) {
  const geometries = useMemo(() => {
    return buildGalaxyBands().map((band) => {
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(band.positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(band.colors, 3))
      geometry.setAttribute('size', new THREE.BufferAttribute(band.sizes, 1))
      return geometry
    })
  }, [])

  useEffect(() => () => geometries.forEach((g) => g.dispose()), [geometries])

  const tiltRefs = useRef<(THREE.Group | null)[]>([])
  const spinRefs = useRef<(THREE.Group | null)[]>([])
  const tilt = useRef({ x: 0, y: 0 })
  const size = useThree((s) => s.size)
  const aspect = size.height > 0 ? size.width / size.height : 16 / 9
  const offsetScale = Math.min(1, aspect / 1.2)
  const offset: [number, number, number] = [
    GALAXY_PARAMS.offset.x * offsetScale,
    GALAXY_PARAMS.offset.y,
    GALAXY_PARAMS.offset.z,
  ]

  useFrame(() => {
    const elapsed = performance.now() / 1000
    const spin = elapsed * GALAXY_PARAMS.rotationSpeed

    tilt.current.x = THREE.MathUtils.damp(
      tilt.current.x, tiltTarget.current?.y ?? 0, GALAXY_PARAMS.tiltDamping, 0.016,
    )
    tilt.current.y = THREE.MathUtils.damp(
      tilt.current.y, tiltTarget.current?.x ?? 0, GALAXY_PARAMS.tiltDamping, 0.016,
    )

    for (const group of spinRefs.current) { if (group) group.rotation.y = spin }
    tiltRefs.current.forEach((group, index) => {
      if (!group) return
      const factor = GALAXY_PARAMS.tiltFactors[index] ?? 1
      group.rotation.x = tilt.current.x * GALAXY_PARAMS.maxTilt * factor
      group.rotation.z = -tilt.current.y * GALAXY_PARAMS.maxTilt * factor
    })
  })

  return (
    <group>
      {geometries.map((geometry, index) => (
        <group
          key={index}
          ref={(g) => { tiltRefs.current[index] = g }}
          position={offset}
        >
          <group rotation={[GALAXY_PARAMS.baseTilt, 0, GALAXY_PARAMS.baseTiltZ]}>
            <group ref={(g) => { spinRefs.current[index] = g }}>
              <points geometry={geometry}>
                <pointsMaterial
                  sizeAttenuation
                  vertexColors
                  depthWrite={false}
                  blending={THREE.AdditiveBlending}
                />
              </points>
            </group>
          </group>
        </group>
      ))}
    </group>
  )
}

export function GalaxyCanvas({ tiltTarget }: GalaxyCanvasProps) {
  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      flat
      dpr={[1, 2]}
      camera={{ position: [0, 8, 8], fov: 75, near: 0.1, far: 100 }}
      onCreated={(state) => {
        state.gl.setClearColor(0x000000, 0)
        state.camera.lookAt(0, 0, 0)
      }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden
    >
      <GalaxyPoints tiltTarget={tiltTarget} />
    </Canvas>
  )
}
