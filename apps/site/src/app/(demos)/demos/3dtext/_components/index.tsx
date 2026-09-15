'use client'
import { Canvas } from '@react-three/fiber'
import Experience from './experience'

export default function PageCanvas() {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [4, -2, 6],
      }}
    >
      <Experience />
    </Canvas>
  )
}