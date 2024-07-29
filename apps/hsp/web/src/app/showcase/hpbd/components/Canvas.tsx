'use client'
import { useEffect, useRef } from 'react'
import GlobalState from './viewModel/Global'
// Ref: https://codepen.io/robin-ivi/pen/ZEWYNEQ


export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    GlobalState.start(canvas)

    GlobalState.update()

    return () => {
      GlobalState.destroy()
    }
  }, [])
  return <canvas ref={canvasRef} />
}
