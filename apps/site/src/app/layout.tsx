import { cn } from '@folio/ui/lib/utils'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

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
      className={cn(notoSans.className, 'font-sans dark')}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  )
}
