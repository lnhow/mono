'use client'
import { button, Leva, useControls } from 'leva'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Physics,
  useContactMaterial,
  usePlane,
  useSphere,
  Triplet,
  useBox,
  CollideEvent,
} from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { BoxGeometry, MeshStandardMaterial, SphereGeometry } from 'three'
import { ComponentType, useEffect, useState } from 'react'

const randomBetween = (between = 1) => (Math.random() - 0.5) * between * 2
interface ShapeOptions {
  type: ComponentType<ShapeProps>
  props: ShapeProps
}
const createSphereProps = (radius = 0.5): ShapeOptions => ({
  type: Sphere,
  props: {
    position: [randomBetween(3), 5, randomBetween(3)],
    radius,
  },
})
const createBoxProps = (radius = 0.5): ShapeOptions => ({
  type: Box,
  props: {
    position: [randomBetween(3), 5, randomBetween(3)],
    radius,
  },
})

export default function Scene() {
  const [shapes, setShapes] = useState<ShapeOptions[]>([])

  useControls({
    'Create Sphere': button(() => {
      setShapes((prev) => [
        ...prev,
        createSphereProps(Math.max(0.2, Math.random() * 0.5)),
      ])
    }),
    'Create Box': button(() => {
      setShapes((prev) => [
        ...prev,
        createBoxProps(Math.max(0.2, Math.random() * 0.5)),
      ])
    }),
    'Reset': button(() => {
      setShapes([])
    })
  })

  return (
    <>
      <Canvas camera={{ position: [0, 5, 10], fov: 75 }} shadows>
        <Physics
          // Default is Naive. Costly to performance
          broadphase="SAP"
          // When Body's speed is increadibily slow, body won't be tested again unless there is a decent force applied to it
          allowSleep
          gravity={[0, -9.81, 0]}
          defaultContactMaterial={{
            friction: 0.1,
            restitution: 0.7,
          }}
        >
          {shapes.map((val, index) => {
            return <val.type key={index} {...val.props} />
          })}
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <ambientLight intensity={0.5} />
          <Plane />
          <OrbitControls />
        </Physics>
        <Perf position="top-left" />
      </Canvas>
      <CollideAudio />
      <Leva />
    </>
  )
}

declare global {
  interface DocumentEventMap {
    'shape-collide': { force: number }
  }
}

const CollideAudio = () => {
  useEffect(() => {
    const audio = new Audio('/static/3js/20-physics/hit.mp3')
    const onCollide = (e: Event) => {
      const customEvent = e as CustomEvent<DocumentEventMap['shape-collide']>
      if (customEvent.detail.force > 1.5) {
        audio.volume = Math.min(1, customEvent.detail.force / 10)
        audio.currentTime = 0
        audio.play()
      }
    }
    document.addEventListener('shape-collide', onCollide)
    return () => {
      audio.pause()
      document.removeEventListener('shape-collide', onCollide)
    }
  }, [])

  return null
}

interface ShapeProps {
  position: Triplet
  radius: number
}
const onShapeCollide = (e: CollideEvent) => {
  document.dispatchEvent(new CustomEvent<DocumentEventMap['shape-collide']>('shape-collide', {
    detail: {
      force: e.contact.impactVelocity
    }
  }))
}

const sphereDefaultOpts = {
  material: new MeshStandardMaterial({ color: 'orange' }),
  geometry: new SphereGeometry(1, 32, 32),
  castShadow: true,
}

const Sphere = ({ position, radius }: ShapeProps) => {
  const [ref] = useSphere(
    () => ({
      mass: 1,
      args: [radius],
      position: position,
      material: 'rubber',
      onCollide: onShapeCollide,
    }),
    undefined,
    [position, radius],
  )
  useContactMaterial('rubber', 'concrete', {
    friction: 0.1,
    restitution: 0.7,
  })

  useFrame(() => {
    // api.applyLocalForce([15, 0, 0], [0, 0, 0])
    // api.applyForce([-0.5, 0, 0], ref.current.position.toArray())
  })

  return (
    <mesh
      ref={ref}
      {...sphereDefaultOpts}
      scale={[radius, radius, radius]}
    ></mesh>
  )
}

const boxDefaultOpts = {
  material: new MeshStandardMaterial({ color: 'orange' }),
  geometry: new BoxGeometry(1, 1, 1),
  castShadow: true,
}
const Box = ({ position, radius }: ShapeProps) => {
  const [ref] = useBox(
    () => ({
      mass: 1,
      args: [radius, radius, radius],
      position: position,
      material: 'rubber',
      onCollide: onShapeCollide,
    }),
    undefined,
    [position, radius],
  )
  useContactMaterial('rubber', 'concrete', {
    friction: 0.1,
    restitution: 0.7,
  })

  useFrame(() => {
    // api.applyLocalForce([15, 0, 0], [0, 0, 0])
    // api.applyForce([-0.5, 0, 0], ref.current.position.toArray())
  })

  return (
    <mesh ref={ref} {...boxDefaultOpts} scale={[radius, radius, radius]}></mesh>
  )
}

const Plane = () => {
  const [ref] = usePlane(() => ({
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
    mass: 0,
    material: 'concrete',
  }))

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial />
    </mesh>
  )
}
