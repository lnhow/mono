import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import PropsWithClassName from '@newts/ui/types/components/common.type'
import classNames from '@newts/ui/utils/classNames'

export default function NwEmptyList({
  title = 'No results found',
  className,
}: PropsWithClassName<{ title?: string }>) {
  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-center',
        className
      )}
    >
      <Inventory2OutlinedIcon className="w-20 h-20 text-neutral-content" />
      <div className="text-neutral-content text-sm mt-4">{title}</div>
    </div>
  )
}
