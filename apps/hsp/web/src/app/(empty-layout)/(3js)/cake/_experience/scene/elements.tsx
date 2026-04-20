import { useAtomValue } from 'jotai'
import { cakeSceneAtom } from '../_state'
import { Cake } from './cake'
import TextMessage from './message'

export default function Elements() {
  const cake = useAtomValue(cakeSceneAtom)

  if (!cake) {
    return null
  }

  return (
    <group>
      <TextMessage />
      <Cake />
    </group>
  )
}
