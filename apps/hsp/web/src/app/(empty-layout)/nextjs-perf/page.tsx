import { DELAY } from './_const'

export default function Page() {
  return (
    <div>
      <div className="p-2">
        <h1 className="text-fore-400">Performance Test</h1>
        <p className='text-xs'>(API delay: {DELAY}ms)</p>
      </div>
      <div className="flex min-w-screen min-h-screen gap-2 px-2">
        <div className="flex-1 w-full">
          <h2 className="text-fore-300">Current</h2>
          <iframe
            src="/nextjs-perf/ssr"
            className="min-h-screen border w-full rounded"
          ></iframe>
        </div>
        <div className="flex-1 w-full">
          <h2 className="text-fore-300">NextJS 16 Cache component</h2>
          <iframe
            src="/nextjs-perf/cached"
            className="min-h-screen border w-full rounded"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
