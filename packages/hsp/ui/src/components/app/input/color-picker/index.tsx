import classNames from '@hsp/ui/utils/classNames'
import {
  ComponentPropsWithRef,
  forwardRef,
  memo,
  useEffect,
  useState,
} from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@hsp/ui/src/components/base/popover'
import { Button } from '@hsp/ui/src/components/base/button'
import { Color, ColorArea, ColorSlider, ColorThumb, SliderTrack } from 'react-aria-components'

export type HsColorPickerProps = ComponentPropsWithRef<'input'> & {
  inputLabel?: {
    className?: string
  }
  container?: {
    className?: string
  }
  value?: string
  onChange?: (color: string) => void
}

export const HsColorPicker = memo(
  forwardRef<HTMLInputElement>(function HsColorPicker(
    { inputLabel, container, value, ...props }: HsColorPickerProps,
    ref,
  ) {
    const [color, setColor] = useState(value)

    useEffect(() => {
      setColor(value)
    }, [value])

    const handleChange = (value: Color) => {
      const hexValue = value.toString('hex')
      setColor(hexValue)
      props?.onChange?.(hexValue)
    }

    return (
      <div className={container?.className}>
        <label
          className={classNames(
            'items-center gap-2',
            'flex h-9 w-full rounded-md border border-input bg-transparent ps-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            inputLabel?.className,
          )}
        >
          <input
            type="text"
            {...props}
            value={color}
            ref={ref}
            className="grow bg-transparent"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size={'icon'}
                variant="outline"
                className="p-0"
                style={{
                  background: (color as unknown as undefined) || '#FFFFFF',
                }}
              ></Button>
            </PopoverTrigger>
            <PopoverContent className="[--picker-size:--spacing(64)]">
              <ColorArea
                colorSpace='rgb'
                value={color}
                className="w-(--picker-size) h-(--picker-size) rounded-md"
                onChange={handleChange}
                xChannel='red'
                yChannel='green'
              >
                <ColorThumb className="z-10 rounded-full border border-fore-300 w-9 h-9" />
              </ColorArea>
              <ColorSlider
                channel="blue"
                value={color}
                onChange={handleChange}
                className="mt-4"
              >
                <SliderTrack className="w-(--picker-size) h-9 rounded-md">
                  <ColorThumb className="h-9 w-2 border border-fore-300 translate-1/2" />
                </SliderTrack>
              </ColorSlider>
            </PopoverContent>
          </Popover>
        </label>
      </div>
    )
  }),
)
