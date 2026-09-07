import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl space-y-6 py-20 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        404
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">The page may have moved.</p>
      <div className="flex justify-center gap-5 text-sm font-medium">
        <Link className="underline" href="/">
          Go home
        </Link>
      </div>
    </section>
  )
}
