import { Skeleton } from '@mui/material'

export default async function FeaturedPosts() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
      <Skeleton variant='rectangular' className='lg:col-span-2 h-[400px]' />
      <div className='flex flex-col gap-4'>
        <Skeleton component={'div'} variant="rectangular" className='h-48' />  
        <Skeleton variant="rectangular" className='h-48' />  
      </div>
    </div>
  )
}
