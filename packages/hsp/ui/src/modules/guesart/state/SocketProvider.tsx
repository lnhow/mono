'use client'
import { memo, PropsWithChildren, useEffect } from 'react'
import { io } from 'socket.io-client'
import { socketAtom } from './store'
import { useSetAtom } from 'jotai'

const getSocketUrl = () => {
  return `${process.env.NEXT_PUBLIC_API_URL}/api/guesart/v1`
}

const SocketProvider = memo(function SocketProvider({
  children,
}: PropsWithChildren) {
  const setAtom = useSetAtom(socketAtom)

  useEffect(() => {
    const socket = io(getSocketUrl(), {
      transports: ['websocket'],
    })
    setAtom((prev) => ({
      ...prev,
      socket,
    }))

    const setConnected = () => {
      setAtom((prev) => ({
       ...prev,
        connected: socket.connected,
      }))
    }

    socket.on('connect', () => {
      setConnected()
      console.log('connected')
    })
    socket.on('disconnect', () => {
      setConnected()
      console.log('disconnected')
    })
    return () => {
      socket.disconnect()
    }
  }, [setAtom])
  return <>{children}</>
})

export default SocketProvider
