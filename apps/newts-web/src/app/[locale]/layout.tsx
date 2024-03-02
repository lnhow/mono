import '../globals.css'
import '@newts/ui/styles.css'
import { Providers } from './_page/providers'
import { LANGUAGES } from '@i18n/config.ts'
import { setRequestLocale } from '@i18n/server'

type RootLocaleLayoutProps = React.PropsWithChildren<{ params: {locale: string} }>

// Language-specific layout
export default async function RootLayout({
  children,
  params: { locale },
}: RootLocaleLayoutProps) {
  setRequestLocale(locale)
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
      process.env.NEXT_PUBLIC_HOST || 'https://hsp.up.railway.app/'
    ),
    alternates: {
      canonical: '/' + locale,
    },
  }
}

// Language-specific static parameters
export function generateStaticParams() {
  return LANGUAGES.map((locale) => ({locale}))
}
