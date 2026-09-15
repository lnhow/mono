/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <a className="font-semibold tracking-tight" href="/">
          Hao Le
        </a>
        <nav aria-label="Primary" className="flex gap-5 text-sm text-muted-foreground">
          <a className="hover:text-foreground" href="/">
            Home
          </a>
          <Link className="hover:text-foreground" href="/blog">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  )
}
