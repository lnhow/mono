import './globals.css'
import { ThemeProvider } from '@hsp/ui/utils/theme/ThemeProvider'
import { Toaster } from '@hsp/ui/components/base/sonner'
import { Lexend } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

const lexendFont = Lexend({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-lexend',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
})

// Language-specific layout
export default function RootLayout({ children }: React.PropsWithChildren) {
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
              <Analytics />
              <SpeedInsights />
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
    authors: [
      {
        name: 'Hao Le',
        url: process.env.NEXT_PUBLIC_HOST || 'https://www.hspln.com',
      },
    ],
    creator: 'Hao Le',
    publisher: 'Hao Le',
    openGraph: {
      title: 'Hao Le',
      description: 'Hao Le\'s personal website. Web Developer. Photography and UX Enthusiast.',
      siteName: 'Hao Le',
    },
  }
}
