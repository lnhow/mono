import { DEFAULT_LANGUAGE, LANG_COOKIE_NAME, LANGUAGES } from '@i18n/config'
import createMiddleware from '@repo/i18n/src/middleware'

const middleware = createMiddleware({
  languages: [...LANGUAGES],
  defaultLanguage: DEFAULT_LANGUAGE,
  langCookieName: LANG_COOKIE_NAME,
})

export default middleware

export const config = {
  matcher: [
    {
      source:
        '/((?!api|showcase|_next/static|_next/image|assets|favicon.ico|sw.js|health|res).*)',
      // missing: [
      //   { type: 'header', key: 'Next-Action' }
      // ]
    },
  ],
}
