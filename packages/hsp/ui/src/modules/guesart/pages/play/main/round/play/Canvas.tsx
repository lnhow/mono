'use client'
import {
  useRef,
  useState,
  useEffect,
  useCallback,
  SyntheticEvent,
  memo,
} from 'react'
import { debounce } from 'lodash'
import { useAtomValue } from 'jotai'
import { socketAtom } from '@hsp/ui/src/modules/guesart/state/store'
import {
  EClientToServerEvents,
  EServerToClientEvents,
} from '@hsp/ui/src/modules/guesart/state/type/socket'
import {
  DEFAULT_BRUSH_SIZES,
  DEFAULT_COLOR,
  getPointerCoords,
  loadImageToCanvas,
} from './const'
import ToolsPanel from './ToolsPanel'
import InfoPanel from './InfoPanel'
import Container from '../../../_components/Container'
import { breakpoints } from '@hsp/ui/src/styles/const'

const ID_CANVAS_CONTAINER = 'canvas-container'

const Canvas = memo(function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [, setHistory] = useState<string[]>([])
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
    ctx.strokeStyle = DEFAULT_COLOR
    ctx.lineWidth = DEFAULT_BRUSH_SIZES[0]
    ctxRef.current = ctx

    const resizeCanvas = debounce(() => {
      const canvasCtn = document.getElementById(ID_CANVAS_CONTAINER)
      if (!canvasCtn) {
        return
      }

      const minSide = window.matchMedia(`(width >= ${breakpoints.md})`)
        .matches
        ? Math.min(canvasCtn.clientWidth, canvasCtn.clientHeight)
        : canvasCtn.clientWidth

      canvas.width = minSide * window.devicePixelRatio
      canvas.height = minSide * window.devicePixelRatio
      if (ctxRef.current) {
        ctxRef.current.scale(window.devicePixelRatio, window.devicePixelRatio)
      }
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
    if (!socket.socket) {
      return
    }

    const handleReceiveCanvas = (canvas: string) => {
      if (!ctxRef.current) {
        return
      }
      loadImageToCanvas(ctxRef.current, canvas)
    }

    socket.socket.on(EServerToClientEvents.CANVAS, handleReceiveCanvas)
    return () => {
      socket.socket?.off(EServerToClientEvents.CANVAS, handleReceiveCanvas)
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
    socket.socket?.emit(
      EClientToServerEvents.CANVAS,
      canvasRef.current?.toDataURL() || '',
    )
  }, [isDrawing, saveHistory, socket.socket])

  const getCanvasContext = useCallback(() => {
    return canvasRef.current?.getContext('2d')
  }, [])

  return (
    <Container>
      <InfoPanel />
      <div
        className="flex-grow w-full rounded-lg flex justify-center items-center bg-base-200"
        id={ID_CANVAS_CONTAINER}
      >
        <canvas
          ref={canvasRef}
          className="bg-white rounded-lg shadow-md mx-auto max-w-full max-h-(--game-canvas-height) cursor-crosshair"
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
      <ToolsPanel getCanvasContext={getCanvasContext} setHistory={setHistory} />
    </Container>
  )
})

export default Canvas
