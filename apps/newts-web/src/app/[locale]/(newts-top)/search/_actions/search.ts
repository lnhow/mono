'use server'

import { redirect } from 'next/navigation'
import { ESearchParam } from './types'

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

  redirect(`/search?${searchParams.toString()}`)
}
