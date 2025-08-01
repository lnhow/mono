import {
  ComponentPropsWithRef,
  forwardRef,
  memo,
} from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@hsp/ui/src/components/base/popover'
import { Button } from '@hsp/ui/src/components/base/button'
import { Color, ColorArea, ColorSlider, ColorThumb, parseColor, SliderTrack } from 'react-aria-components'
import cn from '@hsp/ui/src/utils/cn'

export { parseColor }
export type { Color }
export type HsColorPickerProps = ComponentPropsWithRef<'input'> & {
  inputLabel?: {
    className?: string
  }
  container?: {
    className?: string
  }
  value?: Color
  onChange?: (color: Color) => void
}

export const HsColorPicker = memo(
  forwardRef<HTMLInputElement, HsColorPickerProps>(function HsColorPicker(
    { inputLabel, container, value, ...props }: HsColorPickerProps,
    ref,
  ) {
    const color = value
    const handleChange = (value: Color) => {
      props?.onChange?.(value)
    }

    return (
      <div className={container?.className}>
        <label
          htmlFor={props.id}
          className={cn(
            'items-center gap-2',
            'flex h-9 w-full rounded-md border border-input bg-transparent ps-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            inputLabel?.className,
          )}
        >
          <input
            type="text"
            {...props}
            value={color?.toString('hex')}
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
                colorSpace="hsl"
                value={color}
                className="w-(--picker-size) h-(--picker-size) rounded-md"
                onChange={handleChange}
                xChannel="saturation"
                yChannel="lightness"
              >
                <ColorThumb className="z-10 rounded-full border border-fore-300 w-9 h-9" />
              </ColorArea>
              <ColorSlider
                colorSpace='hsl'
                channel="hue"
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
