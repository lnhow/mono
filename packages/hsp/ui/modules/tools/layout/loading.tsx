export default function LoadingLayoutTools() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex gap-2">
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    </div>
  )
}
