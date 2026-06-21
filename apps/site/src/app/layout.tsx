import type { Metadata } from 'next'

import { SiteHeader } from '@/components/site-header'
import { site } from '@/lib/site'

import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@folio/ui/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.author, url: site.origin }],
  creator: site.author,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
  },
}

export default function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
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
