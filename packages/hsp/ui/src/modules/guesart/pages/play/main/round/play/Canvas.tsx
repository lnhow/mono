'use client'
import {
  useRef,
  useState,
  useEffect,
  ChangeEventHandler,
  useCallback,
  SyntheticEvent,
  FocusEventHandler,
  memo,
} from 'react'
import { Button } from '@hsp/ui/src/components/base/button'
import { Card } from '@hsp/ui/src/components/base/card'
import { /* LuCircle, */ LuUndo, LuX } from 'react-icons/lu'
import { debounce } from 'lodash'
import { useAtomValue } from 'jotai'
import { socketAtom } from '@hsp/ui/src/modules/guesart/state/store'

const DEFAULT_BRUSH_SIZES = [4, 8, 16] as const
const MAX_RECENT_COLORS = 6
const ID_CANVAS_CONTAINER = 'canvas-container'

const getPointerCoords = (canvas: HTMLCanvasElement | null, e: SyntheticEvent) => {
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

const loadImageToCanvas = (
  ctx: CanvasRenderingContext2D,
  imgUrl: string,
) => {
  const img = new Image()
  img.src = imgUrl || ''
  img.onload = () => {
    const canvas = ctx.canvas

    const hRatio = canvas.clientWidth / img.width
    const vRatio = canvas.clientHeight / img.height
    const ratio = Math.min(hRatio, vRatio)
    const centerOffsetX = (canvas.clientWidth - img.width * ratio) / 2
    const centerOffsetY = (canvas.clientHeight - img.height * ratio) / 2

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerOffsetX,
      centerOffsetY,
      img.width * ratio,
      img.height * ratio,
    )
  }
}

const Canvas = memo(function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  // For later use
  const [brushSize] = useState<number>(DEFAULT_BRUSH_SIZES[0])
  const [color, setColor] = useState('#000000')
  const [recentColors, setRecentColors] = useState(['#000000'])
  const [history, setHistory] = useState<string[]>([])
  const socket = useAtomValue(socketAtom)

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

    const resizeCanvas = debounce(() => {
      const canvasCtn = document.getElementById(ID_CANVAS_CONTAINER)
      if (!canvasCtn) {
        return
      }
      console.log(
        '\x1B[35m[Dev log]\x1B[0m -> resizeCanvas -> rootElLayoutHeight:',
        canvasCtn.clientWidth,
        canvasCtn.clientHeight,
        Math.min(canvasCtn.clientWidth, canvasCtn.clientHeight),
      )
      const minSide = Math.min(canvasCtn.clientWidth, canvasCtn.clientHeight)

      canvas.width = minSide * window.devicePixelRatio
      canvas.height = minSide * window.devicePixelRatio
      ctxRef.current?.scale(window.devicePixelRatio, window.devicePixelRatio)
      // canvas.width = canvas.offsetWidth
      // canvas.height = canvas.offsetHeight
    }, 50) // avoid excessive resizing
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

  useEffect(() => {
    if (!socket.socket) {
      return
    }

    const handleReceiveCanvas = (canvas: string) => {
      if (!ctxRef.current) {
        return
      }
      loadImageToCanvas(ctxRef.current, canvas)
    }

    socket.socket.on('receive-canvas', handleReceiveCanvas)
    
    return () => {
      socket.socket?.off('receive-canvas', handleReceiveCanvas)
    }
  }, [socket.socket])

  const startDrawing = useCallback((e: SyntheticEvent) => {
    const { x, y } = getPointerCoords(canvasRef.current, e)

    ctxRef.current?.beginPath()
    ctxRef.current?.moveTo(x, y)
    setIsDrawing(true)
  }, [])

  const draw = useCallback(
    (e: SyntheticEvent) => {
      if (!isDrawing) {
        return
      }
      const { x, y } = getPointerCoords(canvasRef.current, e)
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
    socket.socket?.emit('send-canvas', canvasRef.current?.toDataURL() || '')
  }, [isDrawing, saveHistory, socket.socket])

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
    if (ctxRef.current) {
      loadImageToCanvas(ctxRef.current, last)
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
    <div className="flex flex-col items-center w-full md:h-(--layout-full-height) relative">
      <Card className="p-2 flex flex-col gap-4 shadow-md z-10 max-h-full overflow-auto absolute top-0 left-0 bg-base-300">
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
        {/* <div className="flex flex-col gap-2 items-center">
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
        </div> */}
        <div className="flex flex-col gap-1">
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            onBlur={saveRecentColors}
            className="w-full h-9 rounded-lg shrink-0 p-0 border-none overflow-hidden cursor-pointer"
          />
          {recentColors.length > 1 && (
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
          )}
        </div>
      </Card>
      <div
        className="flex-grow w-full rounded-lg flex justify-center items-center bg-base-200"
        id={ID_CANVAS_CONTAINER}
      >
        <canvas
          ref={canvasRef}
          className="bg-white rounded-lg shadow-md mx-auto max-w-full max-h-(--layout-full-height) cursor-crosshair"
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
})

export default Canvas
