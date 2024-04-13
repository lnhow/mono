import classNames from '@hsp/ui/utils/classNames'
import { ComponentPropsWithRef, memo, useEffect, useState } from 'react'
import { Button, Dialog, DialogTrigger, Popover } from 'react-aria-components'
import { SketchPicker } from 'react-color'

export type HsColorPickerProps = ComponentPropsWithRef<'input'> & {
  inputLabel?: {
    className?: string
  }
  container?: {
    className?: string
  }
}

export const HsColorPicker = memo(function HsColorPicker({
  inputLabel,
  container,
  value,
  ...props
}: HsColorPickerProps) {
  const [color, setColor] = useState(value)

  useEffect(() => {
    setColor(value)
  }, [value])

  return (
    <div className={container?.className}>
      <label
        className={classNames(
          'input input-bordered flex items-center gap-2',
          inputLabel?.className
        )}
      >
        <input type='text' {...props} value={color} className="grow bg-transparent" />
        <DialogTrigger>
          <Button className="btn btn-square btn-sm">
            <div
              className="w-5 h-5 p-1 rounded-sm"
              style={{ background: (color as unknown as undefined) || '#FFFFFF' }}
            ></div>
          </Button>
          <Popover>
            <Dialog>
              {/* @ts-ignore */}
              <SketchPicker color={color} onChange={(color) => {
                setColor(color.hex)
                // @ts-ignore
                props?.onChange?.(color.hex)
              }} className='!bg-base-200 !rounded' />
            </Dialog>
          </Popover>
        </DialogTrigger>
      </label>
    </div>
  )
})
