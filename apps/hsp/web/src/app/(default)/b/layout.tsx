export default function LayoutBlogDetail({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mt-10 max-w-screen-lg min-h-[80vh] md:mx-auto w-full bg-base-200 p-4 rounded">
      {children}
    </div>
  )
}
