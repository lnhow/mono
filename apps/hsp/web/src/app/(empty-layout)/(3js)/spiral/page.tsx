import { Metadata } from 'next'
import { ViewTransition } from 'react'
import CanvasSpiral from './_canvas'

export const metadata: Metadata = {
  title: 'Galaxy Generator',
  description: 'A galaxy spiral generator built with Three.js.',
  openGraph: {
    title: 'Galaxy Generator',
    description: 'A galaxy spiral generator built with Three.js.',
  }
}

export default function PageSpiral() {
  return (
    <ViewTransition name="spiral-card" update="none">
      <CanvasSpiral />
    </ViewTransition>
  )
}
