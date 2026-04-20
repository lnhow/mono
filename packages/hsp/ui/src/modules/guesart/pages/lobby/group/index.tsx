'use client'
import { useAtomValue } from 'jotai'
import { sessionAtom } from '../../../state/store'
import ConnectForm from './ConnectForm'
import Lobby from './rooms'

export function FormGroup() {
  const { userId } = useAtomValue(sessionAtom)

  if (userId) {
    return <Lobby />
  }

  return <ConnectForm />
}
