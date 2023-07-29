import LayoutDefault from '@/common/layouts/LayoutDefault'
import './globals.css'
import { ReactQueryProvider } from './_page/providers/ReactQueryProvider'
import { BaseLayoutProps } from '@/common/layouts/types'

export default function RootLayout({
  children,
}: BaseLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <LayoutDefault>{children}</LayoutDefault>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
