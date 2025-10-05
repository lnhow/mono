export default function LayoutBlogDetail({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mt-10 max-w-screen-xl min-h-[80vh] md:mx-auto w-full p-4 rounded">
      {children}
    </div>
  )
}
