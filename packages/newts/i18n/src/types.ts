import { InitOptions } from 'i18next'

export type TGetOptions = (lang?: string, ns?: string | string[]) => InitOptions

export const DEFAULT_LANGUAGE = 'en' as const
export const DEFAULT_COOKIE_NAMES = {
  LANG: 'lang' ,
  ACCEPT_LANGUAGE: 'Accept-Language',
}

