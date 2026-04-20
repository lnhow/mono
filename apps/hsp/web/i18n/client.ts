'use client'
import { getOptions, LANG_COOKIE_NAME, LANGUAGES } from '@i18n/config'
import initI18nextClient from '@repo/i18n/src/client'

export const useTranslation = initI18nextClient({
  getOptions,
  languages: [...LANGUAGES],
  langCookieName: LANG_COOKIE_NAME,
})
