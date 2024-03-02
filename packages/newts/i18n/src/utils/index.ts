/**
 * Usage: nextRedirect(prefixPathname(locale, '/'))
 * @param locale 
 * @param pathname 
 * @returns 
 */
export async function prefixPathname(locale: string, pathname: string) {
  let localizedHref = '/' + locale

  // Avoid trailing slashes
  if (/^\/(\?.*)?$/.test(pathname)) {
    pathname = pathname.slice(1)
  }

  localizedHref += pathname

  return localizedHref
}
