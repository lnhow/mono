'use client'
import { createStore, Provider } from 'jotai'
import { memo, PropsWithChildren } from 'react'

export const store = createStore()

export const JotaiProvider = memo(function JotaiProvider({
  children,
}: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>
})
