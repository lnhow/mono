'use client'
import { Canvas } from '@react-three/fiber'
import Experience from './experience'

export default function Main() {
  return (
    <Canvas
      camera={{
        // position: [0, 0, 10],
        position: [3, 5, 6],
        zoom: 1.25,
        fov: 75,
        near: 0.1,
        far: 200,
      }}
      
    >
      <Experience />
    </Canvas>
  )
}
