import { cache } from 'react'
import { DEFAULT_LANGUAGE } from './types'

// Workaround until `createServerContext` is available
function getCacheImpl() {
  const value: { locale?: string } = { locale: undefined }
  return value
}
const getCache = cache(getCacheImpl)

export function setRequestLocale(locale: string) {
  // console.log('[Debug Log] -> setRequestLocale -> locale:', locale)
  getCache().locale = locale
}

export function getRequestLocale(): string {
  return getCache().locale || DEFAULT_LANGUAGE
}
