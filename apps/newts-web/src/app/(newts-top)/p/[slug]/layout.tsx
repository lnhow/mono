export default function LayoutPost({ children }: React.PropsWithChildren) {
  return <div className='max-w-screen-lg mx-auto w-full'>
    {children}
  </div>
}