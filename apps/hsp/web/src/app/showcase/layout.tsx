import '@hsp/ui/styles/globals.css'
import { Providers } from '../_[locale]/_page/providers'

type RootLocaleLayoutProps = React.PropsWithChildren<{ params: Promise<{locale: string}> }>

// Language-specific layout
export default async function RootLayout({
  children,
  params,
}: RootLocaleLayoutProps) {
  const { locale } = await params
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

// Language-specific metadata
export const generateMetadata = () => {
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_HOST || 'https://hspln.vercel.app/'
    ),
    alternates: {
      canonical: './',
    }
  }
}
