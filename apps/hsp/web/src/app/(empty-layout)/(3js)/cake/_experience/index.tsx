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
      <Controls className="absolute bottom-0 left-0 right-0 z-20" />
      <Credit className="absolute bottom-0 left-0 z-10 p-4" />
      <Audio className="absolute bottom-2 right-2 z-10" />
    </>
  )
}
