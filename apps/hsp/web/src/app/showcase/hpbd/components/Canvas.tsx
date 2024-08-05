'use client'
import { useEffect, useRef, useState } from 'react'
import Scene from './viewModel/Scene'
// Ref: https://codepen.io/robin-ivi/pen/ZEWYNEQ

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    Scene.start(canvas)

    return () => {
      Scene.destroy()
    }
  }, [])
  const onClick = () => { 
    setIsStarted(true)

    Scene.update()
  }
  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} />
      <button
        className="btn btn-primary fixed bottom-8 left-[calc(50%-40px)] w-20 data-[start=true]:hidden"
        data-start={isStarted}
        onClick={onClick}
      >
        Click
      </button>
    </div>
  )
}
