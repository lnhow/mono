export default function FeaturedPostsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="skeleton lg:col-span-2 h-[400px]" />
      <div className="flex flex-col gap-4">
        <div className="skeleton h-48" />
        <div className="skeleton h-48" />
      </div>
    </div>
  )
}
