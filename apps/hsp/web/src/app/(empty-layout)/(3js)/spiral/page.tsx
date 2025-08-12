import { Metadata } from 'next'
import CanvasSpiral from './_canvas'

export const metadata: Metadata = {
  title: 'Spiral'
}

export default function PageSpiral() {
  return <CanvasSpiral />
}
