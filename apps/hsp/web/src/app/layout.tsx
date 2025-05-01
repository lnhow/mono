import './globals.css'
import { ThemeProvider } from '@hsp/ui/src/components/theme/ThemeProvider'

type RootLocaleLayoutProps = React.PropsWithChildren<{
  params: Promise<{ locale: string }>
}>

// Language-specific layout
export default async function RootLayout({ children }: RootLocaleLayoutProps) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

// Language-specific metadata
export const generateMetadata = async () => {
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_HOST || 'https://hspln.vercel.app/',
    ),
    alternates: {
      canonical: '/',
    },
  }
}
