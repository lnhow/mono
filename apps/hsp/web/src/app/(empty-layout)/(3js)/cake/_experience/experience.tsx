import { Environment, Sparkles } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import { DirectionalLight } from 'three'
import Elements from './scene/elements'

export default function Experience() {
  const directionalLightRef = useRef<DirectionalLight>(null)

  return (
    <>
      <Debug />
      <OrbitControls makeDefault />
      <fog attach="fog" args={['lightpink', 60, 100]} />
      <Elements />
      <ambientLight intensity={2} color="#ffa4a4" />
      <Sparkles size={6} scale={[6, 7, 6]} position={[0, 1, 0]} />
      <directionalLight
        intensity={10}
        lookAt={[0, 0, 0]}
        position={[0, 5, 5]}
        castShadow
        ref={directionalLightRef}
      />
      <Environment
        preset="city"
        background
        backgroundIntensity={1.5}
        blur={10}
      />
    </>
  )
}

function Debug() {
  if (process.env.NEXT_PUBLIC_ENV !== 'development') {
    return null
  }
  return <Perf showGraph={false} />
}
