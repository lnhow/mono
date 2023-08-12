'use client'
import './globals.css'
import LayoutDefault from '@/common/layouts/LayoutDefault'
import { Providers } from './_page/providers'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST || ''),
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className=" text-black dark:text-white">
        <Providers>
          <LayoutDefault>{children}</LayoutDefault>
        </Providers>
      </body>
    </html>
  )
}
