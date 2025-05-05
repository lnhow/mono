'use client'
import {
  useRef,
  useState,
  useEffect,
  ChangeEventHandler,
  useCallback,
  SyntheticEvent,
  FocusEventHandler,
} from 'react'
import { Button } from '@hsp/ui/src/components/base/button'
import { Card } from '@hsp/ui/src/components/base/card'
import { LuCircle, LuUndo, LuX } from 'react-icons/lu'

const DEFAULT_BRUSH_SIZES = [4, 8, 16] as const
const MAX_RECENT_COLORS = 6

type CanvasEvent = SyntheticEvent

const getCoords = (canvas: HTMLCanvasElement | null, e: SyntheticEvent) => {
  if (!canvas) {
    return { x: 0, y: 0 }
  }
  const rect = canvas.getBoundingClientRect()
  let clientX = 0,
    clientY = 0

  if (e.nativeEvent instanceof TouchEvent) {
    clientX = e.nativeEvent.touches[0]?.clientX ?? 0
    clientY = e.nativeEvent.touches[0]?.clientY ?? 0
  }
  if (e.nativeEvent instanceof MouseEvent) {
    clientX = e.nativeEvent.clientX
    clientY = e.nativeEvent.clientY
  }

  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  }
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState<number>(DEFAULT_BRUSH_SIZES[0])
  const [color, setColor] = useState('#000000')
  const [recentColors, setRecentColors] = useState(['#000000'])
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctxRef.current = ctx

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctxRef.current?.scale(window.devicePixelRatio, window.devicePixelRatio)
      // canvas.width = canvas.offsetWidth
      // canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('orientationchange', resizeCanvas)
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('orientationchange', resizeCanvas)
    }
  }, [])

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color
      ctxRef.current.lineWidth = brushSize
    }
  }, [color, brushSize])

  const startDrawing = useCallback((e: CanvasEvent) => {
    const { x, y } = getCoords(canvasRef.current, e)

    ctxRef.current?.beginPath()
    ctxRef.current?.moveTo(x, y)
    setIsDrawing(true)
  }, [])

  const draw = useCallback(
    (e: CanvasEvent) => {
      if (!isDrawing) {
        return
      }
      const { x, y } = getCoords(canvasRef.current, e)
      ctxRef.current?.lineTo(x, y)
      ctxRef.current?.stroke()
    },
    [isDrawing],
  )

  const saveHistory = useCallback(() => {
    const canvas = canvasRef.current
    const image = canvas?.toDataURL()
    if (!image) {
      return
    }
    setHistory((prev) => [...prev, image])
  }, [])

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return
    ctxRef.current?.closePath()
    setIsDrawing(false)
    saveHistory()
  }, [isDrawing, saveHistory])

  const clearCanvas = useCallback(() => {
    if (!ctxRef.current || !canvasRef.current) return
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    )
    setHistory([])
  }, [])

  const undo = useCallback(() => {
    const prev = [...history]
    prev.pop()
    const last = prev[prev.length - 1]
    if (!last) {
      clearCanvas()
      return
    }
    const img = new Image()
    img.src = last || ''
    img.onload = () => {
      if (!ctxRef.current || !canvasRef.current) return
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      )
      ctxRef.current.drawImage(img, 0, 0)
    }
    setHistory(prev)
  }, [history, clearCanvas])

  const handleColorChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const newColor = e.target.value
      setColor(newColor)
    },
    [],
  )

  const saveRecentColors: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const newColor = e.target.value
      setRecentColors((prev) => {
        const updated = [newColor, ...prev.filter((c) => c !== newColor)].slice(
          0,
          MAX_RECENT_COLORS,
        )
        return updated
      })
    },
    [],
  )

  return (
    <div className="flex flex-col items-center w-full h-[calc(100vh-var(--layout-header-height)---spacing(4))] relative">
      <Card className="p-2 flex flex-col gap-4 shadow-md z-10 max-h-full overflow-auto absolute top-0 left-0">
        <div className="flex flex-col gap-2">
          <Button onClick={undo} variant="outline">
            <LuUndo />
            Undo
          </Button>
          <Button onClick={clearCanvas} variant="outline">
            <LuX />
            Clear
          </Button>
        </div>
        <div className="flex flex-col gap-2 items-center">
          {DEFAULT_BRUSH_SIZES.map((size) => (
            <Button
              key={size}
              variant={brushSize === size ? 'default' : 'outline'}
              onClick={() => setBrushSize(size)}
              className="w-full"
            >
              <LuCircle
                size={size}
                style={{
                  width: size,
                  height: size,
                }}
              />
              {size}
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            onBlur={saveRecentColors}
            className="w-full h-9 rounded-md shrink-0 p-0 border-none cursor-pointer"
          />
          <div className="grid grid-cols-3 gap-2">
            {recentColors.map((c, i) => (
              <button
                key={i}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
                className="w-6 h-6 rounded-full border border-fore-400"
              ></button>
            ))}
          </div>
        </div>
      </Card>
      <div className="flex-grow w-full rounded-lg">
        <canvas
          ref={canvasRef}
          className="bg-white rounded-lg shadow-md w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={(e) => {
            e.stopPropagation()
            startDrawing(e)
          }}
          onTouchMove={(e) => {
            e.stopPropagation()
            draw(e)
          }}
          onTouchEnd={(e) => {
            e.stopPropagation()
            stopDrawing()
          }}
        />
      </div>
    </div>
  )
}
