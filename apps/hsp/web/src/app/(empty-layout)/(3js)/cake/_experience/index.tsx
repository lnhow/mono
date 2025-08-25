'use client'
import { Canvas } from '@react-three/fiber'
import Experience from './experience'

export default function Main() {
  return (
    <Canvas
      camera={{
        // isOrthographicCamera: true,
        position: [3, 4, 5],
        fov: 75,
        near: 0.1,
        far: 200,
      }}
      
    >
      <Experience />
    </Canvas>
  )
}
