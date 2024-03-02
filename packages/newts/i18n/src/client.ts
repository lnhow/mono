import { useEffect, useState } from 'react'
import i18next from 'i18next'
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from 'react-i18next'
import { useCookies } from 'react-cookie'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { DEFAULT_COOKIE_NAMES, TGetOptions } from './types'

export default function initI18nextClient({
  getOptions,
  languages,
  langCookieName = DEFAULT_COOKIE_NAMES.LANG,
}: { getOptions: TGetOptions,} & {
  languages: string[]
  langCookieName?: string
}) {
  const runsOnServerSide = typeof window === 'undefined'
  // Init
  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@i18n/langs/${language}/${namespace}.json`)
      )
    )
    .init({
      ...getOptions(),
      lng: undefined, // let detect the language on client side
      detection: {
        order: ['path', 'htmlTag', 'cookie', 'navigator'],
      },
      preload: runsOnServerSide ? languages : [],
    })

  return function useTranslation(
    ns: string | string[],
    lang?: string,
    options: {
      keyPrefix?: string
    } = {}
  ) {
    const [cookies, setCookie] = useCookies([langCookieName])
    const ret = useTranslationOrg(ns, options)
    const { i18n } = ret
    if (runsOnServerSide && lang && i18n.resolvedLanguage !== lang) {
      i18n.changeLanguage(lang)
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        if (activeLng === i18n.resolvedLanguage) return
        setActiveLng(i18n.resolvedLanguage)
      }, [activeLng, i18n.resolvedLanguage])
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        if (!lang || i18n.resolvedLanguage === lang) return
        i18n.changeLanguage(lang)
      }, [lang, i18n])
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        if (cookies.i18next === lang) return
        setCookie(langCookieName, lang, { path: '/' })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [lang, cookies.i18next])
    }
    return ret
  }
}
