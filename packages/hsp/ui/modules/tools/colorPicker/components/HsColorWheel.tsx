import classNames from '@hsp/ui/utils/classNames'
import {
  ColorThumb,
  ColorWheel,
  ColorWheelProps,
  ColorWheelTrack,
} from 'react-aria-components'

type HsColorWheelProps = ColorWheelProps

export default function HsColorWheel({
  thumbClassName,
  ...props
}: HsColorWheelProps & { thumbClassName?: string }) {
  return (
    <ColorWheel {...props}>
      <ColorWheelTrack />
      <ColorThumb
        className={classNames(
          'w-6 h-6 rounded-full shadow-sm border-white border',
          thumbClassName
        )}
      />
    </ColorWheel>
  )
}
