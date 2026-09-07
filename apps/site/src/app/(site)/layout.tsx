import { SiteHeader } from '@/components/site-header'

export default function SiteLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-5 py-12">{children}</main>
      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-muted-foreground">
          © 2026 Hao Le
        </div>
      </footer>
    </>
  )
}
