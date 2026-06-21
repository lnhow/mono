import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link className="font-semibold tracking-tight" href="/">
          Hao Le
        </Link>
        <nav aria-label="Primary" className="flex gap-5 text-sm text-muted-foreground">
          <Link className="hover:text-foreground" href="/">
            Home
          </Link>
          <Link className="hover:text-foreground" href="/blog">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  )
}
