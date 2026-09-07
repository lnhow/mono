import Link from 'next/link'
import { LucideArrowLeft } from 'lucide-react'
import type React from 'react'

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-1.5 text-xs font-medium text-zinc-300 shadow-md backdrop-blur-md transition hover:bg-zinc-800 hover:text-white"
        >
          <LucideArrowLeft size={14} />
          <span>Back to Blog</span>
        </Link>
      </div>
      {children}
    </>
  )
}
