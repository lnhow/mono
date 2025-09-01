'use client'
import { Canvas } from '@react-three/fiber'
import Experience from './experience'
import Controls from './controls'

export default function Main() {
  return (
    <>
      <Canvas
        camera={{
          position: [3, 5, 6],
          zoom: 1.25,
          fov: 75,
          near: 0.1,
          far: 200,
        }}
      >
        <Experience />
      </Canvas>
      <Controls className="absolute bottom-0 left-0 right-0 z-10" />
    </>
  )
}
