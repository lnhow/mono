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
  languages: string[],
  defaultLanguage: string,
  langCookieName?: string,
}) {
  acceptLanguage.languages(languages)
  function resolveLanguage(req: NextRequest) {
    const lng = languages.find((lang) => req.nextUrl.pathname.startsWith(`/${lang}`))
    if (lng) {
      return {
        lng,
        redirect: lng !== acceptLanguage.get(req.cookies.get(langCookieName)?.value),
      }
    }
    else if (req.cookies.has(langCookieName)) {
      return {
        lng: acceptLanguage.get((req.cookies.get(langCookieName))?.value) || defaultLanguage,
        redirect: false,
      }
    }
    else if (req.headers.has(DEFAULT_COOKIE_NAMES.ACCEPT_LANGUAGE)) {
      return {
        lng: acceptLanguage.get(req.headers.get(DEFAULT_COOKIE_NAMES.ACCEPT_LANGUAGE)) || defaultLanguage,
        redirect: true,
      }
    }
    return {
      lng: defaultLanguage,
      redirect: true,
    }
  }

  return function middleware(req: NextRequest) {
    console.log(`${req.method} ${req.url}`)
    if (
      req.nextUrl.pathname.startsWith('/_next')
    ) {
      return
    }
  
    const { lng, redirect } = resolveLanguage(req)

    // Redirect if lng in path is not supported
    if (
      redirect
    ) {
      console.log('Redirecting to', `/${lng}${req.nextUrl.pathname}`)
      const response = NextResponse.redirect(
        new URL(`/${lng}${req.nextUrl.pathname}?${req.nextUrl.searchParams.toString()}`, req.url)
      )
      response.cookies.set(langCookieName, lng)
      return response
    }

    const response = NextResponse.next()
    response.cookies.set(langCookieName, lng)

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

// acceptLanguage.languages([...LANGUAGES])
//
// export function middleware(req: NextRequest) {
//   let lng
//   if (req.cookies.has(LANG_COOKIE_NAME)) {
//     lng = acceptLanguage.get((req.cookies.get(LANG_COOKIE_NAME))?.value)
//   }
//   if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
//   if (!lng) lng = DEFAULT_LANGUAGE

//   // Redirect if lng in path is not supported
//   if (
//     !LANGUAGES.some((lang) => req.nextUrl.pathname.startsWith(`/${lang}`)) &&
//     !req.nextUrl.pathname.startsWith('/_next')
//   ) {
//     return NextResponse.redirect(
//       new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
//     )
//   }

//   const response = NextResponse.next()

//   if (req.headers.has('referer')) {
//     const refererUrl = new URL(req.headers.get('referer') as string)
//     const lngInReferer = LANGUAGES.find((l) =>
//       refererUrl.pathname.startsWith(`/${l}`)
//     )
//     if (lngInReferer) response.cookies.set(LANG_COOKIE_NAME, lngInReferer)
//     return response
//   }

//   return response
// }
