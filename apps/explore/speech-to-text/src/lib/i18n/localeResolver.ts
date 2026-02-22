export const SUPPORTED_LOCALES = ['en', 'vi'] as const
export const DEFAULT_LOCALE = 'en'

export const LOCAL_STORAGE_KEY = 'locale'

export function resolveLocale(): string {
  const storedLocale = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (storedLocale) {
    return storedLocale
  }

  const browserLocale = navigator.language || DEFAULT_LOCALE
  const resolvedLocale = SUPPORTED_LOCALES.find((loc) =>
    browserLocale.toLowerCase().startsWith(loc)
  )
  return resolvedLocale || DEFAULT_LOCALE
}

export function setLocale(locale: string) {
  localStorage.setItem(LOCAL_STORAGE_KEY, locale)
}

export function loadTranslations(locale: string) {
  switch (locale) {
    case 'vi':
      return import('./lang/vi.json')
    case 'en':
    default:
      return import('./lang/en.json')
  }
}
