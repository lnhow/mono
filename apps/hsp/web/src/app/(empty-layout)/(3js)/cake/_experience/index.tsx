'use client'
import { Canvas } from '@react-three/fiber'
import Experience from './experience'
import {
  cakeAtom,
} from './_state'
import { useSearchParams } from 'next/navigation'
import { useHydrateAtoms } from 'jotai/utils'
import { decodeCakeURL } from './_const'

import Controls from './html/controls'
import Credit from './html/credit'
import Audio from './html/audio'

export default function Main() {
  const searchParams = useSearchParams()
  const defaultCakeVal = decodeCakeURL(searchParams.toString())
  useHydrateAtoms([[cakeAtom, defaultCakeVal]])

  return (
    <>
      <Canvas
        shadows
        camera={{
          position: [2, 1.5, 6],
          zoom: 1.25,
          fov: 75,
          near: 0.1,
          far: 200,
        }}
      >
        <Experience />
      </Canvas>
      <Controls className="absolute bottom-safe left-safe right-0 z-20" />
      <Audio className="absolute bottom-safe right-safe z-20 p-1" />
      <Credit className="absolute bottom-safe left-safe z-10 p-1" />
    </>
  )
}
