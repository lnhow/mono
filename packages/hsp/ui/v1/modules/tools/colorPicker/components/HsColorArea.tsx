import { ColorArea, ColorThumb, type ColorAreaProps } from 'react-aria-components'
import cn from '@hsp/ui/src/utils/cn'

export default function HsColorArea({
  className,
  ...props
}: ColorAreaProps & { className?: string }) {
  return (
    <ColorArea
      {...props}
      className={cn('w-20 h-20 rounded', className)}
    >
      <ColorThumb className="w-4 h-4 rounded-full shadow-xl !bg-white border-slate-700 border-opacity-60 border" />
    </ColorArea>
  )
}
