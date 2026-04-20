'use client'
import { createContext, type PropsWithChildren, useContext } from 'react'
import type { MockLoginResponse } from '../../../_components/child/data/api-server'

type AuthContextType = {
  user: Promise<MockLoginResponse | null>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({
  children,
  user,
}: PropsWithChildren<AuthContextType>) {
  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  )
}
