import '../globals.css'
import '@hsp/ui/styles.css'
import { Providers } from '../[locale]/_page/providers'

type RootLocaleLayoutProps = React.PropsWithChildren<{ params: {locale: string} }>

// Language-specific layout
export default async function RootLayout({
  children,
  params: { locale },
}: RootLocaleLayoutProps) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

// Language-specific metadata
export const generateMetadata = ({ params: { locale }} : RootLocaleLayoutProps) => {
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_HOST || 'https://hspln.vercel.app/'
    ),
    alternates: {
      canonical: '/' + locale,
    },
  }
}
