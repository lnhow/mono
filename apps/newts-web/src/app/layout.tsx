import LayoutDefault from '@/common/layouts/LayoutDefault'
import './globals.css'
import { ReactQueryProvider } from './_providers/ReactQueryProvider'

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
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
