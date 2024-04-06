'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { ESearchParam } from './types'
import { prefixPathname } from '@newts/i18n/src/utils'
import { LANG_COOKIE_NAME } from '@i18n/config'

export default async function handleSearch(formSearch: FormData) {
  const query = formSearch.get('query')
  const category = formSearch.get('category')
  const searchParams = new URLSearchParams()
  if (query) {
    searchParams.set(ESearchParam.Query, query.toString())
  }
  if (category) {
    searchParams.set(ESearchParam.Category, category.toString())
  }
  const locale = cookies().get(LANG_COOKIE_NAME)?.value

  return redirect(
    await prefixPathname(locale, `/search?${searchParams.toString()}`),
  )
}
