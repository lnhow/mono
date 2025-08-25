import { Environment } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei/core/OrbitControls'
import { Perf } from 'r3f-perf'
import { Cake1 } from './cakes/Cake1'
import TextMessage from './message'

export default function Experience() {
  return (
    <>
      <Perf />
      <OrbitControls makeDefault />
      <ambientLight intensity={0.7} />
      <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, -5]} castShadow />
      <Environment preset="city" background blur={1} backgroundIntensity={1.5} />
      <TextMessage />
      <Cake1 position={[0, -1, 0]} />
    </>
  )
}
