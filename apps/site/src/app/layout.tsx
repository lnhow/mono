import { cn } from '@folio/ui/lib/utils'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import { SiteHeader } from '@/components/site-header'
import { rootMetadata } from '@/lib/site-metadata'

import './globals.css'

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = rootMetadata

export default function RootLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <html
      lang="en"
      className={cn(notoSans.className, 'font-sans')}
      data-scroll-behavior="smooth"
    >
      <body>
        <SiteHeader />
        <main className="mx-auto w-full max-w-5xl px-5 py-12">{children}</main>
        <footer className="border-t">
          <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hao Le
          </div>
        </footer>
      </body>
    </html>
  )
}
