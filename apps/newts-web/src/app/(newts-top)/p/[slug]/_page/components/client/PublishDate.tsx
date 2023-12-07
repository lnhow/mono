'use client'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

export default function PublishDate({ date }: { date?: string }) {
  if (!date) {
    return <></>
  }

  const jsDate = new Date(date)
  return (
    <span className='flex items-center text-xs'>
      <AccessTimeIcon className='mr-1' fontSize='small' />
      {jsDate.toLocaleDateString() + ' ' + jsDate.toLocaleTimeString()}
    </span>
  )
}
