'use client'
import { useAtomValue } from 'jotai'
import ConnectForm from './ConnectForm'
import { sessionAtom } from '../../../state/store'
import Lobby from './rooms'

export function FormGroup() {
  const { userId } = useAtomValue(sessionAtom)

  if (userId) {
    return <Lobby />
  }

  return <ConnectForm />
}