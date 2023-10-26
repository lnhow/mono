import './globals.css'
import '@newts/common.gui/styles.css'

import LayoutDefault from '../common/layouts/LayoutDefault'
import { Providers } from './_page/providers'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST || 'https://hsp.up.railway.app/'),
  alternates: {
    canonical: '/',
  },
}

export default async function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="text-black dark:text-white">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
