import I18nServer from '@newts/i18n/src/server'
import { DEFAULT_LANGUAGE, getOptions } from './config'
import { cache } from 'react'

const i18nServer = new I18nServer({
  getOptions,
  defaultLanguage: DEFAULT_LANGUAGE,
})

export const getTranslation = cache(i18nServer.getTranslation.bind(i18nServer))

export { getRequestLocale, setRequestLocale } from '@newts/i18n/src/RequestLocale'
