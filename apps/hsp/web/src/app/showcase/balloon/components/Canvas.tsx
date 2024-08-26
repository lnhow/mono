'use client'
import { useEffect, useRef, useState } from 'react'
import Scene from './viewModel/Scene'
import GiftBox from './GiftBox'
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
      <GiftBox onClick={onClick} started={isStarted} />
    </div>
  )
}
