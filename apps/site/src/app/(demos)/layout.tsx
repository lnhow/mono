/* eslint-disable @next/next/no-html-link-for-pages */
import { LucideArrowLeft } from 'lucide-react'
import type React from 'react'
import { BfcacheHandler } from './_components/bfcache-handler'

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BfcacheHandler />
      <div className="fixed top-4 left-4 z-50">
        {/* Native <a> forces full page reload to properly tear down & recreate WebGL/R3F contexts */}
        <a
          href="/blog"
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-1.5 text-xs font-medium text-zinc-300 shadow-md backdrop-blur-md transition hover:bg-zinc-800 hover:text-white"
        >
          <LucideArrowLeft size={14} />
          <span>Back to Blog</span>
        </a>
      </div>
      {children}
    </>
  )
}
