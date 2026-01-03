/**
 * This module provides a mount function to render the Card component.
 * It uses `createRoot` from `react-dom/client` to mount the React component.
 *
 * DO NOT USE THIS FILE IN PRODUCTION. IT IS FOR DEMONSTRATION PURPOSES ONLY.
 * Use `createBridgeComponent` from `@module-federation/bridge-react` instead.
 */

import { createRoot } from 'react-dom/client'
import Card, { type CardProps } from '../card'
import { StrictMode } from 'react'

export const mount = (el: HTMLElement, props: CardProps) => {
  const root = createRoot(el)
  root.render(
    <StrictMode>
      <Card {...props} />
    </StrictMode>
  )

  return () => {
    root.unmount()
  }
}
