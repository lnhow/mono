import { memo, useCallback, useState } from 'react'
import { CanvasContextGetter, DEFAULT_COLOR, DRAWING_COLORS } from '../const'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@hsp/ui/src/components/base/popover'
import { Button } from '@hsp/ui/src/components/base/button'
import Tooltip from '@hsp/ui/src/components/base/tooltip'

const ColorSelector = memo(function ColorSelector({
  getCanvasContext,
}: {
  getCanvasContext: CanvasContextGetter
}) {
  const [color, setColor] = useState<string>(DEFAULT_COLOR)

  const handleColorChange = useCallback(
    (newColor: string) => {
      setColor(newColor)
      const context = getCanvasContext()
      if (context) {
        context.strokeStyle = newColor
      }
    },
    [getCanvasContext],
  )

  return (
    <div className="flex flex-col gap-1">
      <Popover>
        <Tooltip label="Select Color">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              style={{
                background: color || DEFAULT_COLOR,
              }}
            ></Button>
          </PopoverTrigger>
        </Tooltip>
        <PopoverContent className="max-w-screen flex flex-wrap gap-1 p-1">
          {DRAWING_COLORS.map((color) => (
            <Button
              key={color}
              variant="outline"
              size="icon"
              style={{
                background: color || DEFAULT_COLOR,
              }}
              onClick={() => {
                handleColorChange(color)
              }}
            ></Button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  )
})

export default ColorSelector
