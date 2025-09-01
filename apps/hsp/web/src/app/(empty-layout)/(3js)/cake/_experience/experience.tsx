import { Environment, Sparkles } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
import { Perf } from 'r3f-perf'
import { Cake1 } from './cakes/Cake1'
import TextMessage from './message'
import { Suspense } from 'react'

export default function Experience() {
  return (
    <>
      <Perf />
      <OrbitControls makeDefault />
      <fog attach="fog" args={['lightpink', 60, 100]} />
      <group>
        <TextMessage />
        <Suspense>
          <Cake1 />
        </Suspense>
      </group>
      <ambientLight intensity={2} color="#ffa4a4" />
      <Sparkles size={6} scale={[6, 7, 6]} position={[0, 1, 0]} color="#fdcfcf" />
      <directionalLight
        intensity={10}
        lookAt={[0, 0, 0]}
        position={[10, 15, -5]}
        color="#d8a2a2"
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
