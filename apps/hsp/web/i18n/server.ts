import I18nServer from '@repo/i18n/src/server'
import { DEFAULT_LANGUAGE, getOptions } from './config'
import { cache } from 'react'

const i18nServer = new I18nServer({
  getOptions,
  defaultLanguage: DEFAULT_LANGUAGE,
})

export const getTranslation: ReturnType<typeof cache<typeof i18nServer.getTranslation>> = cache(
  (...args: Parameters<typeof i18nServer.getTranslation>) => {
    return i18nServer.getTranslation(...args)
  }
)

export {
  getRequestLocale,
  setRequestLocale,
} from '@repo/i18n/src/RequestLocale'
