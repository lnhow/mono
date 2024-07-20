import { NextResponse, NextRequest } from 'next/server'
import acceptLanguage from 'accept-language'
import { DEFAULT_COOKIE_NAMES, DEFAULT_LANGUAGE } from './types'

export const HEADER_REFERER = 'referer' as const

/**
 * Default middleware configuration for ease of use
 */
// export const defaultMiddlewareConfig = {
//   // matcher: '/:lng*'
//   matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
//   // matcher: ['/', '/(vi|en)/:path*'],
// }

export default function createMiddleware({
  languages,
  defaultLanguage = DEFAULT_LANGUAGE,
  langCookieName = DEFAULT_COOKIE_NAMES.LANG,
}: {
  languages: string[]
  defaultLanguage: string
  langCookieName?: string
}) {
  acceptLanguage.languages(languages)
  function resolveLanguage(req: NextRequest) {
    const lngInPath = languages.find((lang) =>
      req.nextUrl.pathname.startsWith(`/${lang}`)
    )
    const lngInCookie = req.cookies.get(langCookieName)?.value
    if (lngInPath || lngInCookie) {
      return {
        lng: lngInPath || lngInCookie || defaultLanguage,
        redirect: lngInPath !== acceptLanguage.get(lngInCookie),
        setCookie: !lngInCookie,
      }
    }

    return {
      lng: req.headers.has(DEFAULT_COOKIE_NAMES.ACCEPT_LANGUAGE)
        ? acceptLanguage.get(
            req.headers.get(DEFAULT_COOKIE_NAMES.ACCEPT_LANGUAGE)
          ) || defaultLanguage
        : defaultLanguage,
      redirect: true,
    }
  }

  return function middleware(req: NextRequest) {
    console.log(`${req.method} ${req.url}`)
    if (req.nextUrl.pathname.startsWith('/_next')) {
      return
    }

    const { lng, redirect, setCookie } = resolveLanguage(req)

    // Redirect if lng in path is not supported
    if (redirect) {
      const redirectUrl = new URL(
        req.nextUrl.pathname.startsWith(`/${lng}`)
          ? req.nextUrl
          : `/${lng}` + req.nextUrl.toString(),
        req.url
      )
      console.log('Redirecting to', `${redirectUrl}`)
      const response = NextResponse.redirect(redirectUrl)
      setCookie && response.cookies.set(langCookieName, lng)
      return response
    }

    const response = NextResponse.next()
    setCookie && response.cookies.set(langCookieName, lng)

    if (req.headers.has(HEADER_REFERER)) {
      const refererUrl = new URL(req.headers.get(HEADER_REFERER) as string)
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`)
      )
      if (lngInReferer) response.cookies.set(langCookieName, lngInReferer)
      return response
    }

    return response
  }
}
