import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Typography } from '@mui/material'

export default function PublishDate({ date }: { date?: string }) {
  if (!date) {
    return <></>
  }

  const jsDate = new Date(date)
  return (
    <Typography variant='caption' className='flex items-center'>
      <AccessTimeIcon className='mr-1' />
      {jsDate.toLocaleDateString() + ' ' + jsDate.toLocaleTimeString()}
    </Typography>
  )
}
