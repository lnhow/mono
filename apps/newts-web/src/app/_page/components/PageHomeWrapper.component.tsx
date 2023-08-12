'use client'

import { useQuery } from '@tanstack/react-query'
import { getPageHomeData } from '../api'
import PageHome from './PageHome.component'
import { notFound } from 'next/navigation'
import { ICategory } from '@/common/components/pages/index/ListCategory'
import { IPost } from '@/common/components/pages/index/ListPosts'
import { INITIAL_QUERY_KEY } from '../types'
import logger from '@/common/utils/logger'

export default function HomePageWrapper() {
  const { data, error, isLoading } = useQuery({
    queryKey: [INITIAL_QUERY_KEY],
    queryFn: getPageHomeData,
  })

  if (isLoading) {
    // Skeleton/loading goes here
    return <></>
  }
  if (error || !data) {
    logger.log('[ERR][Fetching data]', error, data)
    notFound()
  }
  const props = mapToProps(data)
  return <PageHome {...props} />
}

const mapToProps = (dataQuery: Awaited<ReturnType<typeof getPageHomeData>>) => {
  return {
    categories: dataQuery[0].data?.categories?.data as ICategory[] || [],
    posts: dataQuery[1].data?.posts?.data as IPost[] || [],
    // @ts-ignore
    // posts: resPosts.posts.data || [],
  }
}
