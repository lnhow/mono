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

const ENTRANCE_DELAY = 0.3 // s
const ENTRANCE_DURATION = 5 // s
const ENTRANCE_EDGE_SOFTNESS = 0.5

function GalaxyPoints({
  tiltTarget,
}: {
  tiltTarget: RefObject<GalaxyTiltTarget>
}) {
  const geometries = useMemo(() => {
    return buildGalaxyBands().map((band) => {
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(band.positions, 3),
      )
      geometry.setAttribute('color', new THREE.BufferAttribute(band.colors, 3))
      return geometry
    })
  }, [])

  const entranceProgress = useRef({ value: 0 })
  const timer = useMemo(() => {
    const t = new THREE.Timer()
    if (typeof document !== 'undefined') t.connect(document)
    return t
  }, [])

  const material = useMemo(() => {
    let maxDistance = 0
    for (const geometry of geometries) {
      const positions = geometry.getAttribute('position').array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        const d = Math.hypot(
          positions[i]!,
          positions[i + 1]!,
          positions[i + 2]!,
        )
        if (d > maxDistance) maxDistance = d
      }
    }

    const reach = (maxDistance + ENTRANCE_EDGE_SOFTNESS).toFixed(4)
    const softness = ENTRANCE_EDGE_SOFTNESS.toFixed(4)

    const mat = new THREE.PointsMaterial({
      size: GALAXY_PARAMS.size,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uEntranceProgress = entranceProgress.current

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          `#include <common>
varying float vDistanceFromCenter;`,
        )
        .replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
vDistanceFromCenter = length(position);`,
        )

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
uniform float uEntranceProgress;
varying float vDistanceFromCenter;`,
        )
        .replace(
          'outgoingLight = diffuseColor.rgb;',
          `float threshold = uEntranceProgress * ${reach};
float visibility = 1.0 - smoothstep(threshold - ${softness}, threshold, vDistanceFromCenter);
outgoingLight = diffuseColor.rgb * visibility;`,
        )
    }
    return mat
  }, [geometries])

  useEffect(
    () => () => {
      geometries.forEach((g) => g.dispose())
      material.dispose()
      timer.dispose()
    },
    [geometries, material, timer],
  )

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
    timer.update()
    const elapsed = timer.getElapsed()
    const t = Math.min(
      Math.max(elapsed - ENTRANCE_DELAY, 0) / ENTRANCE_DURATION,
      1,
    )
    entranceProgress.current.value = 1 - Math.pow(1 - t, 3)

    const spin = elapsed * GALAXY_PARAMS.rotationSpeed

    tilt.current.x = THREE.MathUtils.damp(
      tilt.current.x,
      tiltTarget.current?.y ?? 0,
      GALAXY_PARAMS.tiltDamping,
      0.016,
    )
    tilt.current.y = THREE.MathUtils.damp(
      tilt.current.y,
      tiltTarget.current?.x ?? 0,
      GALAXY_PARAMS.tiltDamping,
      0.016,
    )

    for (const group of spinRefs.current) {
      if (group) group.rotation.y = spin
    }
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
          ref={(g) => {
            tiltRefs.current[index] = g
          }}
          position={offset}
        >
          <group
            rotation={[GALAXY_PARAMS.baseTilt, 0, GALAXY_PARAMS.baseTiltZ]}
          >
            <group
              ref={(g) => {
                spinRefs.current[index] = g
              }}
            >
              <points geometry={geometry} material={material} />
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
