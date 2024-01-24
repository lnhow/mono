'use client'
import { MdOutlineAccessTime } from 'react-icons/md'

export default function PublishDate({ date }: { date?: string }) {
  if (!date) {
    return <></>
  }

  const jsDate = new Date(date)
  return (
    <span className='flex items-center text-xs'>
      <MdOutlineAccessTime className='mr-1 icon-md' />
      {jsDate.toLocaleDateString() + ' ' + jsDate.toLocaleTimeString()}
    </span>
  )
}
