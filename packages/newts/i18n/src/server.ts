/**
 * This file is used to initialize i18next for server-side rendering.
 * We're not using the i18next singleton here
 * but creating a new instance on each useTranslation call,
 * because during compilation everything seems to be executed in parallel.
 * Having a separate instance will keep the translations consistent.
 */
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { DEFAULT_LANGUAGE, TGetOptions } from './types'
import { getRequestLocale } from './RequestLocale'

// Class version
export default class I18nServer {
  constructor({
    getOptions,
    defaultLanguage = DEFAULT_LANGUAGE,
  }: {
    getOptions: TGetOptions,
    defaultLanguage: string
  }) {
    this._getOptions = getOptions
    this._defaultLanguage = defaultLanguage
  }

  async getTranslation(
    ns: string | string[],
    lang?: string,
    options: {
      keyPrefix?: string
    } = {}
  ) {
    const resolvedLang = lang || await getRequestLocale() || this._defaultLanguage
    // console.log('[Debug Log] -> I18nServer -> resolvedLang:', resolvedLang)
    const i18nextInstance = await this.initI18next(resolvedLang, ns)
    return {
      t: i18nextInstance.getFixedT(
        resolvedLang,
        Array.isArray(ns) ? ns[0] : ns,
        options.keyPrefix
      ),
      i18n: i18nextInstance,
    }
  }

  async initI18next(lang: string, ns: string | string[]) {
    const i18nInstance = createInstance()
    await i18nInstance
      .use(initReactI18next)
      .use(
        resourcesToBackend(
          (language: string, namespace: string) =>
            import(`@i18n/langs/${language}/${namespace}.json`)
        )
      )
      .init(this._getOptions(lang, ns))
    return i18nInstance
  }

  _getOptions: TGetOptions
  _defaultLanguage: string
}

// Function version
// import { createInstance, i18n, InitOptions } from 'i18next'
// export type TInitI18next = (lng: string, ns: string | string[]) => Promise<i18n>

// export type TGetTranslation = (
//   lang: string,
//   ns: string | string[],
//   options?: {
//     keyPrefix?: string
//   }
// ) => Promise<{
//   t: i18n['t']
//   i18n: i18n
// }>

// export function initServerI18next(getOptions: TGetOptions) {
//   const initI18next: TInitI18next = async (lng, ns) => {
//     const i18nInstance = createInstance()
//     await i18nInstance
//       .use(initReactI18next)
//       .use(
//         resourcesToBackend(
//           (language: string, namespace: string) =>
//             import(`./locales/${language}/${namespace}.json`)
//         )
//       )
//       .init(getOptions(lng, ns))
//     return i18nInstance
//   }
//   const getTranslation: TGetTranslation = async (
//     lng,
//     ns,
//     options = {}
//   ) => {
//     const i18nextInstance = await initI18next(lng, ns)
//     return {
//       t: i18nextInstance.getFixedT(
//         lng,
//         Array.isArray(ns) ? ns[0] : ns,
//         options.keyPrefix
//       ),
//       i18n: i18nextInstance,
//     }
//   }

//   return {
//     initI18next,
//     getTranslation,
//   }
// }
