import { cache } from 'react'
import { cookies } from 'next/headers'

// Workaround until `createServerContext` is available
function getCacheImpl() {
  const value: { locale?: string } = { locale: undefined }
  return value
}
const getCache = cache(getCacheImpl)

export function setRequestLocale(locale: string) {
  getCache().locale = locale
}

export async function getRequestLocale(): Promise<string | undefined> {
  let locale = getCache().locale
  if (locale) return locale

  locale = (await cookies()).get('NEXT_LOCALE')?.value
  if (locale) {
    setRequestLocale(locale)
  }
  return locale
}
