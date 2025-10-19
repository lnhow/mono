import cn from '@hsp/ui/utils/cn'
import {
  ColorSlider,
  ColorSliderProps,
  ColorThumb,
  Label,
  SliderOutput,
  SliderTrack,
} from 'react-aria-components'

export default function HsColorSlider(props: ColorSliderProps) {
  return (
    <ColorSlider {...props} className="my-2">
      <div className="flex space-between mb-2">
        <Label className="flex-1" />
        <SliderOutput />
      </div>
      <SliderTrack
        className={cn(
          'w-full h-4 rounded transition-opacity',
          props.isDisabled && 'opacity-25'
        )}
      >
        <ColorThumb className="w-2 h-6 top-2 rounded-full shadow border border-white" />
      </SliderTrack>
    </ColorSlider>
  )
}
