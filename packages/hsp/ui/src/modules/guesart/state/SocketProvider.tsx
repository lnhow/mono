'use client'
import { memo, PropsWithChildren, useEffect } from 'react'
import { io } from 'socket.io-client'
import { sessionAtom, socketAtom } from './store'
import { useSetAtom } from 'jotai'
import { EServerToClientEvents, GrtSocket } from './type/socket'

const getSocketUrl = () => {
  return `${process.env.NEXT_PUBLIC_API_URL}/api/guesart/v1`
}

const SocketProvider = memo(function SocketProvider({
  children,
}: PropsWithChildren) {
  const setAtom = useSetAtom(socketAtom)
  const setSessionAtom = useSetAtom(sessionAtom)

  useEffect(() => {
    const socket: GrtSocket = io(getSocketUrl(), {
      transports: ['websocket'],
      autoConnect: false,
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

    socket.on(EServerToClientEvents.SESSION, (session) => {
      // Set the session so that when reconnecting, we can use the same session
      socket.auth = {
        session: session.session,
      }
      try {
        sessionStorage.setItem('session', session.session)
      } catch (error) {
        console.error('Error saving session to sessionStorage:', error)
      }

      setSessionAtom((prev) => ({
        ...prev,
        ...session,
      }))
    })

    socket.on('connect', () => {
      setConnected()
      console.log('connected')
    })

    socket.on('disconnect', () => {
      setConnected()
      console.log('disconnected')
    })

    try {
      const session = sessionStorage.getItem('session')
      if (session) {
        socket.auth = {
          session: session,
        }
        // Connect to the server
        socket.connect()
      }
    } catch (error) {
      console.error('Error retrieving session from sessionStorage:', error)
    }
    return () => {
      socket.disconnect()
    }
  }, [setAtom, setSessionAtom])
  return <>{children}</>
})

export default SocketProvider
