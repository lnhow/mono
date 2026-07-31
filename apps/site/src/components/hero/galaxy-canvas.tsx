'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useRef, type RefObject } from 'react'
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
  const reducedMotion = useReducedMotion()

  return (
    <Canvas
      aria-hidden
      flat
      dpr={[1, 2]}
      frameloop={reducedMotion === true ? 'demand' : 'always'}
      camera={{ position: [0, 8, 8], fov: 75, near: 0.1, far: 100 }}
      fallback={<div className="absolute inset-0" aria-hidden />}
      onCreated={(state) => state.camera.lookAt(0, 0, 0)}
    >
      <GalaxyPoints tiltTarget={tiltTarget} reducedMotion={reducedMotion === true} />
    </Canvas>
  )
}

interface GalaxyPointsProps {
  tiltTarget: RefObject<GalaxyTiltTarget>
  reducedMotion: boolean
}

function GalaxyPoints({ tiltTarget, reducedMotion }: GalaxyPointsProps) {
  const geometries = useMemo(() => {
    const inner = resolveCssColor('--signal-amber', GALAXY_INNER_FALLBACK)
    const outer = resolveCssColor('--signal-blue', GALAXY_OUTER_FALLBACK)
    return buildGalaxyBands(inner, outer).map((band) => {
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(band.positions, 3),
      )
      geometry.setAttribute('color', new THREE.BufferAttribute(band.colors, 3))
      return geometry
    })
  }, [])

  useEffect(
    () => () => geometries.forEach((geometry) => geometry.dispose()),
    [geometries],
  )

  const tiltRefs = useRef<(THREE.Group | null)[]>([])
  const spinRefs = useRef<(THREE.Group | null)[]>([])
  const tilt = useRef({ x: 0, y: 0 })

  const size = useThree((state) => state.size)
  const invalidate = useThree((state) => state.invalidate)

  const aspect = size.width / size.height
  const offsetScale = Math.min(1, aspect / 1.2)
  const offset: [number, number, number] = [
    GALAXY_PARAMS.offset.x * offsetScale,
    GALAXY_PARAMS.offset.y,
    GALAXY_PARAMS.offset.z,
  ]

  useEffect(() => {
    if (reducedMotion) invalidate()
  }, [reducedMotion, invalidate])

  useFrame((state, delta) => {
    if (reducedMotion) return

    const spin = state.clock.elapsedTime * GALAXY_PARAMS.rotationSpeed
    tilt.current.x = THREE.MathUtils.damp(
      tilt.current.x,
      tiltTarget.current?.y ?? 0,
      GALAXY_PARAMS.tiltDamping,
      delta,
    )
    tilt.current.y = THREE.MathUtils.damp(
      tilt.current.y,
      tiltTarget.current?.x ?? 0,
      GALAXY_PARAMS.tiltDamping,
      delta,
    )

    spinRefs.current.forEach((group) => {
      if (group) group.rotation.y = spin
    })
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
          ref={(group) => {
            tiltRefs.current[index] = group
          }}
          position={offset}
        >
          <group rotation={[GALAXY_PARAMS.baseTilt, 0, 0]}>
            <group
              ref={(group) => {
                spinRefs.current[index] = group
              }}
            >
              <points geometry={geometry}>
                <pointsMaterial
                  size={GALAXY_PARAMS.size}
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
