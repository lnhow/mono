import { Suspense } from 'react'
import TextMessage from './message'
import { Cake } from './cake'
import { useAtomValue } from 'jotai'
import { cakeSceneAtom } from '../_state'

export default function Elements() {
  const cake = useAtomValue(cakeSceneAtom)

  if (!cake) {
    return null
  }

  return (
    <group>
      <Suspense fallback={null}>
        <TextMessage />
      </Suspense>
      <Suspense>
        <Cake />
      </Suspense>
    </group>
  )
}
