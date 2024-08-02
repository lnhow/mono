'use client'
import { useEffect, useRef } from 'react'
import Scene from './viewModel/Scene'
// Ref: https://codepen.io/robin-ivi/pen/ZEWYNEQ


export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    Scene.start(canvas)

    Scene.update()

    return () => {
      Scene.destroy()
    }
  }, [])
  return <canvas ref={canvasRef} />
}
