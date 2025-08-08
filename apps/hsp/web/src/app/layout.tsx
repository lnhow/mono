import './globals.css'
import { ThemeProvider } from '@hsp/ui/src/components/theme/ThemeProvider'
import { Toaster } from '@hsp/ui/src/components/base/sonner'
import { Lexend } from 'next/font/google'

const lexendFont = Lexend({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-lexend',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
})

type RootLocaleLayoutProps = React.PropsWithChildren<{
  params: Promise<{ locale: string }>
}>

// Language-specific layout
export default function RootLayout({ children }: RootLocaleLayoutProps) {
  return (
    <html suppressHydrationWarning lang="en">
        <body className={lexendFont.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
            {/* <ViewTransition> */}
              {children}
              <Toaster />
            {/* </ViewTransition> */}
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
