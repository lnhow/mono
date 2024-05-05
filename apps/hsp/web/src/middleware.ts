import createMiddleware from '@newts/i18n/src/middleware'
import { LANGUAGES, DEFAULT_LANGUAGE, LANG_COOKIE_NAME } from '@i18n/config'

const middleware = createMiddleware({
  languages: [...LANGUAGES],
  defaultLanguage: DEFAULT_LANGUAGE,
  langCookieName: LANG_COOKIE_NAME,
})

export default middleware

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|health|res).*)',
      // missing: [
      //   { type: 'header', key: 'Next-Action' }
      // ]
    },
  ]
}
