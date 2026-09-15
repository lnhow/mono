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
const BAND_SPEEDS = [1.5, 1.428, 1.357] // Inner spins faster, outer drifts slower

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

  const material = useMemo(() => {
    const reach = (
      GALAXY_PARAMS.radius * (1 + GALAXY_PARAMS.randomness) +
      ENTRANCE_EDGE_SOFTNESS
    ).toFixed(4)
    const softness = ENTRANCE_EDGE_SOFTNESS.toFixed(4)
    const maxRadius = GALAXY_PARAMS.radius.toFixed(4)

    const mat = new THREE.PointsMaterial({
      size: GALAXY_PARAMS.size,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    mat.customProgramCacheKey = () => 'galaxy-points-material'

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
        .replace(
          'gl_PointSize = size;',
          `gl_PointSize = size;
float r = clamp(length(position.xz) / ${maxRadius}, 0.0, 1.0);
float sizeRatio = mix(20.0, 1.0, pow(r, 0.25));
gl_PointSize *= sizeRatio;`,
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

// Circular point shape + luminous falloff
float dist = length(gl_PointCoord - vec2(0.5));
if (dist > 0.5) discard;

float strength = 1.0 - dist * 2.0;
float glow = pow(strength, 3.0);
outgoingLight = diffuseColor.rgb * glow * visibility * 3.5;`,
        )
    }
    return mat
  }, [])

  useEffect(
    () => () => {
      geometries.forEach((g) => g.dispose())
      material.dispose()
    },
    [geometries, material],
  )

  const tiltRefs = useRef<(THREE.Group | null)[]>([])
  const spinRefs = useRef<(THREE.Group | null)[]>([])
  const tilt = useRef({ x: 0, y: 0 })
  const size = useThree((s) => s.size)
  const aspect = size.height > 0 ? size.width / size.height : 16 / 9
  const offsetScale = Math.min(1, aspect / 1.2)
  const portraitFactor = Math.max(0, Math.min(1, (1 - aspect) / 0.5))
  const offset: [number, number, number] = [
    GALAXY_PARAMS.offset.x * offsetScale * (1 - portraitFactor * 0.5),
    GALAXY_PARAMS.offset.y + portraitFactor * 2.0,
    GALAXY_PARAMS.offset.z - portraitFactor * 1.8,
  ]
  const baseTiltX =
    GALAXY_PARAMS.baseTilt + portraitFactor * ((10 * Math.PI) / 180)
  const baseTiltZ = GALAXY_PARAMS.baseTiltZ * (1 - portraitFactor * 0.4)

  const MAX_DELTA = 0.05 // Cap frame delta to 50ms to prevent jumps on main-thread stalls or GC pauses

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime
    const safeDelta = Math.min(delta, MAX_DELTA)

    if (entranceProgress.current.value < 1) {
      const t = Math.min(
        Math.max(elapsed - ENTRANCE_DELAY, 0) / ENTRANCE_DURATION,
        1,
      )
      entranceProgress.current.value = 1 - Math.pow(1 - t, 3)
    }

    tilt.current.x = THREE.MathUtils.damp(
      tilt.current.x,
      tiltTarget.current?.y ?? 0,
      GALAXY_PARAMS.tiltDamping,
      safeDelta,
    )
    tilt.current.y = THREE.MathUtils.damp(
      tilt.current.y,
      tiltTarget.current?.x ?? 0,
      GALAXY_PARAMS.tiltDamping,
      safeDelta,
    )

    for (let i = 0; i < geometries.length; i++) {
      const spinGroup = spinRefs.current[i]
      if (spinGroup) {
        const speed = BAND_SPEEDS[i % BAND_SPEEDS.length] ?? 1
        spinGroup.rotation.y += safeDelta * GALAXY_PARAMS.rotationSpeed * speed
      }

      const tiltGroup = tiltRefs.current[i]
      if (tiltGroup) {
        const factor = GALAXY_PARAMS.tiltFactors[i] ?? 1
        tiltGroup.rotation.x = tilt.current.x * GALAXY_PARAMS.maxTilt * factor
        tiltGroup.rotation.z = -tilt.current.y * GALAXY_PARAMS.maxTilt * factor
      }
    }
  })

  return (
    <group position={offset} rotation={[baseTiltX, 0, baseTiltZ]}>
      {geometries.map((geometry, index) => (
        <group
          key={index}
          ref={(g) => {
            tiltRefs.current[index] = g
          }}
        >
          <group
            ref={(g) => {
              spinRefs.current[index] = g
            }}
          >
            <points geometry={geometry} material={material} />
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
