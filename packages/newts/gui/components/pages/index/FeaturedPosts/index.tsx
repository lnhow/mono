import { Skeleton } from '@mui/material'

export default async function FeaturedPosts() {
  return (
    <div className='flex gap-4 flex-col xl:flex-row'>
      <div className='flex flex-col gap-4'>
        <Skeleton variant="rectangular" className='w-full xl:w-96 h-48' />  
        <Skeleton variant="rectangular" className='w-full xl:w-96 h-48' />  
      </div>
      <Skeleton variant='rectangular' className='flex-4 w-full h-[400px] order-first xl:order-none' />
      <div className='flex flex-col gap-4'>
        <Skeleton variant="rectangular" className='w-full xl:w-96 h-48' />  
        <Skeleton variant="rectangular" className='w-full xl:w-96 h-48' />  
      </div>
    </div>
  )
}
