'use client'
import initI18nextClient from '@newts/i18n/src/client'
import { LANGUAGES, LANG_COOKIE_NAME, getOptions } from '@i18n/config'

export const useTranslation = initI18nextClient({
  getOptions,
  languages: [...LANGUAGES],
  langCookieName: LANG_COOKIE_NAME,
})
