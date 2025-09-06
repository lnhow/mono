'use client'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 75 }}
    >
      <Physics gravity={[0, -9.81, 0]}>
        <Sphere />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <ambientLight intensity={0.5} />
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial />
        </mesh>
        <OrbitControls />
      </Physics>
    </Canvas>
  )
}

const Sphere = () => {
  return (
    <mesh position={[0, 1, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
