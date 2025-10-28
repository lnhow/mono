import { Button } from '@hsp/ui/components/button'
import { Card } from '@hsp/ui/components/card'
import { Dispatch, memo, SetStateAction, useMemo } from 'react'
import { LuUndo, LuX } from 'react-icons/lu'
import ColorSelector from './ColorSelector'
import { CanvasContextGetter, loadImageToCanvas } from '../const'
import debounce from 'lodash.debounce'
import { DEFAULT_DEBOUNCE_TIME } from '@hsp/ui/utils/debounce'
import Tooltip from '@hsp/ui/components/tooltip'

const ToolsPanel = memo(function ToolsPanel({
  getCanvasContext,
  setHistory,
}: {
  getCanvasContext: CanvasContextGetter
  setHistory: Dispatch<SetStateAction<string[]>>
}) {
  const { clearCanvas, undo } = useMemo(() => {
    const _clearCanvas = () => {
      const context = getCanvasContext()
      const canvas = context?.canvas
      if (!context || !canvas) return
      context.clearRect(0, 0, canvas.width, canvas.height)
    }

    return {
      clearCanvas: () => {
        _clearCanvas()
        setHistory([])
      },
      undo: debounce(() => {
        setHistory((prev) => {
          if (prev.length === 0) {
            return prev
          }

          const newHistory = [...prev]
          newHistory.pop()

          const last = newHistory[newHistory.length - 1]
          if (!last) {
            _clearCanvas()
            return newHistory
          }

          const context = getCanvasContext()
          if (context) {
            loadImageToCanvas(context, last)
          }
          return newHistory
        })
      }, DEFAULT_DEBOUNCE_TIME),
    }
  }, [getCanvasContext, setHistory])

  return (
    <div className="absolute bottom-0 left-0 right-0">
      <Card className="p-2 flex gap-4 shadow-md z-10 max-w-full overflow-auto bg-base-300 mx-auto w-fit">
        <ColorSelector getCanvasContext={getCanvasContext} />
        <div className="gap-2 flex">
          <Tooltip label="Undo">
            <Button onClick={undo} variant="outline" size="icon">
              <LuUndo />
            </Button>
          </Tooltip>
          <Tooltip label="Clear">
            <Button onClick={clearCanvas} variant="outline" size="icon">
              <LuX />
            </Button>
          </Tooltip>
        </div>
      </Card>
    </div>
  )
})

export default ToolsPanel
