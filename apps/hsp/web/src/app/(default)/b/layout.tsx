export default function LayoutBlogDetail({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mt-10 max-w-screen-lg min-h-[80vh] md:mx-auto w-full p-4 rounded prose">
      <main className="max-w-[80ch] mx-auto">
        {children}
      </main>
    </div>
  )
}
