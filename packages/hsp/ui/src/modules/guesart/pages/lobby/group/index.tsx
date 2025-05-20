'use client'
import { useAtomValue } from 'jotai'
import ConnectForm from './ConnectForm'
import { socketAtom } from '../../../state/store'
import Lobby from './rooms'

export function FormGroup() {
  const { connected } = useAtomValue(socketAtom)

  if (connected) {
    return <Lobby />
  }

  return <ConnectForm />
}