import { Perf } from 'r3f-perf'
import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from '@react-three/drei'
import { font } from '../../_shared/const'
import { useEffect, useRef } from 'react'
import {
  BoxGeometry,
  ConeGeometry,
  Mesh,
  MeshMatcapMaterial,
  SRGBColorSpace,
  TorusGeometry,
} from 'three'
import { useFrame } from '@react-three/fiber'

const ITEMS = 100
const EMPTY_ARRAY = [...Array(ITEMS)]
const GEOMETRIES = [
  new TorusGeometry(),
  new BoxGeometry(),
  new ConeGeometry(undefined, undefined, 3),
]

// TODO: Fix cannot call impure function Math.random()
/* eslint-disable react-hooks/purity */
export default function Experience() {
  const [matcapTexture] = useMatcapTexture(
    '7B5254_E9DCC7_B19986_C8AC91',
    256,
    (texture) => {
      const textures = Array.isArray(texture) ? texture : [texture]
      for (const item of textures) {
        item.colorSpace = SRGBColorSpace
      }
    },
  )
  const material = useRef(new MeshMatcapMaterial())
  useEffect(() => {
    material.current.matcap = matcapTexture
    material.current.needsUpdate = true
  }, [matcapTexture])

  const donuts = useRef<Mesh[]>([])
  useFrame((_, delta) => {
    const _donuts = donuts.current
    if (!_donuts) {
      return
    }
    for (const child of _donuts) {
      child.rotation.y += delta * 0.3
    }
  })

  return (
    <>
      <Perf />
      <OrbitControls makeDefault />
      <Center>
        <Text3D
          font={font}
          material={material.current}
          size={0.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled={true}
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Welcome
        </Text3D>
      </Center>
      <group>
        {EMPTY_ARRAY.map((_, index) => {
          const objScale = Math.random() * 0.2 + 0.1
          const shape = Math.floor(Math.random() * 3)

          return (
            <mesh
              key={index}
              ref={(el) => {
                if (!el) {
                  return
                }
                donuts.current[index] = el
              }}
              geometry={GEOMETRIES[shape] || GEOMETRIES[0]}
              material={material.current}
              position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
              ]}
              rotation={[
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI,
              ]}
              scale={objScale}
            ></mesh>
          )
        })}
      </group>
    </>
  )
}
