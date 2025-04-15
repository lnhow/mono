// import '@hsp/ui/styles/globals.css'
import '../globals.css'
import { Providers } from './_page/providers'
import { LANGUAGES } from '@i18n/config.ts'
import { setRequestLocale } from '@i18n/server'

type RootLocaleLayoutProps = React.PropsWithChildren<{
  params: Promise<{ locale: string }>
}>

// Language-specific layout
export default async function RootLayout({
  children,
  params,
}: RootLocaleLayoutProps) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className="bg-base-100 text-fore-400 font-light"
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

// Language-specific metadata
export const generateMetadata = async ({ params }: RootLocaleLayoutProps) => {
  const { locale } = await params
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_HOST || 'https://hspln.vercel.app/'
    ),
    alternates: {
      canonical: '/' + locale,
    },
  }
}

// Language-specific static parameters
export function generateStaticParams() {
  return LANGUAGES.map((locale) => ({ locale }))
}
