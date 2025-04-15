import { TGetOptions } from '@repo/i18n/src/types'

export const LANGUAGES = ['en', 'vi'] as const
export const LANG_COOKIE_NAME = 'NEXT_LOCALE' as const

export const DEFAULT_LANGUAGE = 'en' as const
export const DEFAULT_NS = 'common' as const


export const getOptions: TGetOptions = (lang = DEFAULT_LANGUAGE, ns = DEFAULT_NS) => {
  return {
    supportedLngs: LANGUAGES,
    lng: lang,
    ns,
    defaultNS: DEFAULT_NS,
    fallbackNS: DEFAULT_NS,
    fallbackLng: false,
  } as ReturnType<TGetOptions>
}
