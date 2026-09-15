'use client'
import { Canvas } from '@react-three/fiber'
import Experience from './experience'
import { cakeAtom } from './_state'
import { useSetAtom } from 'jotai'
import { useSearchParams } from 'next/navigation'
import { useHydrateAtoms } from 'jotai/utils'
import { decodeCakeURL } from './_const'

import Controls from './html/controls'
import Credit from './html/credit'
import Audio from './html/audio'
import { Loader } from '@react-three/drei/web/Loader'
import {
  // Activity,
  memo,
  startTransition,
  // Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  ViewTransition,
} from 'react'
import { useProgress } from '@react-three/drei/web'

export default function Main() {
  return (
    <>
      <Canvas
        className="z-[1]"
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
      <HtmlUI />
      <Loader />
      <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-neutral-900">
        <h1 className="sr-only">Cake</h1>
        <p>Loading...</p>
      </div>
    </>
  )
}

export const Hydrate = memo(function Hydrate() {
  const searchParams = useSearchParams()
  const setCake = useSetAtom(cakeAtom)
  const defaultCakeVal = useMemo(
    () => decodeCakeURL(searchParams.toString()),
    [searchParams],
  )
  useHydrateAtoms([[cakeAtom, defaultCakeVal]])

  useEffect(() => {
    setCake(defaultCakeVal)
  }, [defaultCakeVal, setCake])

  return null
})

const HtmlUI = memo(function HtmlUI() {
  const progress = useProgress()
  const [loading, setLoading] = useState(true)
  const isLoadedOnce = useRef(false)

  useEffect(() => {
    if (isLoadedOnce.current) {
      return
    }

    if (progress.active || progress.total === 0) {
      return
    }

    isLoadedOnce.current = true
    startTransition(() => {
      setLoading(false)
    })
  }, [progress.active, progress.total])

  return (
    <ViewTransition update="none">
      {/* TODO: Find workarounds */}
      {/* Activity cause audio to keep playing on NextJS 16.0.3 - React 19.2 */}
      {/* <Activity mode={loading ? 'hidden' : 'visible'}> */}
      {loading ? null : (
        <>
          <Controls className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 px-2" />
          <Audio className="absolute bottom-safe right-safe z-20 p-1" />
          <Credit className="absolute bottom-safe left-safe z-10 p-1" />
          <Loader />
        </>
      )}
      {/* </Activity> */}
    </ViewTransition>
  )
})
