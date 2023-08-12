export default function LayoutPost({ children }: React.PropsWithChildren) {
  return <main className='max-w-screen-lg w-full p-4 lg:p-8'>
    {children}
  </main>
}