import { LOCALES } from '@/configs/i18n'
import { Providers } from './_page/providers'
import '../globals.css'
import '@newts/ui/styles.css'

type RootLocaleLayoutProps = React.PropsWithChildren<{ params: {locale: string} }>

export function generateStaticParams() {
  return LOCALES.map((locale) => ({locale}))
}

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

export default function RootLocaleLayout({
  children,
  params: { locale }
}: RootLocaleLayoutProps) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
