'use server'

import { redirect } from 'next/navigation'

export default async function handleSearch(formSearch: FormData) {
  const query = formSearch.get('query')
  const category = formSearch.get('category')
  const searchParams = new URLSearchParams()
  if (query) {
    searchParams.set('q', query.toString())
  }
  if (category) {
    searchParams.set('c', category.toString())
  }
  console.log('[Dev Log] -> file: search.ts:9 -> handleSearch -> searchParams:', searchParams)

  redirect(`/search?${searchParams.toString()}`)
}
