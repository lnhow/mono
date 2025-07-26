import cn from '@hsp/ui/src/utils/cn'
import { LuLoaderCircle } from 'react-icons/lu'

export default function CircularProgress({
  className,
}: {
  className?: string
}) {
  return <LuLoaderCircle className={cn('animate-spin', className)} />
}
