import { DELAY } from './_components/const'
import ComparisonIframe from './_components/iframe'

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-2 flex items-center space-x-2">
        <h1 className="text-fore-400 font-bold">Performance Test</h1>
        <div className="flex">
          <div className="text-center px-2 py-1 border rounded">
            <p className="text-xs">API delay</p>
            <p className="text-sm text-fore-400">{DELAY}ms</p>
          </div>
        </div>
      </div>
      <div className="flex md:flex min-w-screen flex-1 gap-2 px-2 pb-2">
        <ComparisonIframe
          title="Current"
          src="/nextjs-perf/ssr"
          className="flex flex-col"
          iframeClassName="min-h-[50vh] flex-1 h-full"
        />
        <ComparisonIframe
          title="NextJS 16 Cache component"
          src="/nextjs-perf/cached"
          className="flex flex-col"
          iframeClassName="min-h-[50vh] flex-1"
        />
      </div>
      {/* <div className="flex min-w-screen min-h-screen gap-2 px-2">
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
      </div> */}
    </div>
  )
}
