import { ColorArea, ColorThumb, type ColorAreaProps } from 'react-aria-components'
import classNames from '@hsp/ui/utils/classNames'

export default function HsColorArea({
  className,
  ...props
}: ColorAreaProps & { className?: string }) {
  return (
    <ColorArea
      {...props}
      className={classNames('w-20 h-20 rounded', className)}
    >
      <ColorThumb className="w-4 h-4 rounded-full shadow-sm border-white border" />
    </ColorArea>
  )
}