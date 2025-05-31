import { memo } from 'react'
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip as BaseTooltip,
  TooltipContent,
} from './base'

const Tooltip = memo(function Tooltip({
  children,
  className,
  label,
}: {
  children: React.ReactNode
  label: React.ReactNode
  className?: string
}) {
  return (
    <TooltipProvider delayDuration={400} skipDelayDuration={150}>
      <BaseTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={className}>{label}</TooltipContent>
      </BaseTooltip>
    </TooltipProvider>
  )
})

export default Tooltip
