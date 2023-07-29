
import { GetAllPostsDocument, GetAllPostsQuery, GetParentCategoriesDocument, GetParentCategoriesQuery } from '@/common/utils/graphql/_generated/graphql'
import { queryClient } from '@/common/utils/graphql/graphqlClient'
import PageHome, { IPageHomeProps } from './_components/HomePage.component'
import { TPageInitialData } from './_types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newts | A news website',
  description: 'A news website',
}

export const getPageInitialData = async (): Promise<TPageInitialData<IPageHomeProps>> => {
  const http = queryClient.GraphQL()
  try {
    const [
      resCategories,
      resPosts,
    ] = await Promise.all([
      // {categories: {data: []}}, {posts: {data: []}}
      http.request<GetParentCategoriesQuery>(GetParentCategoriesDocument),
      http.request<GetAllPostsQuery>(GetAllPostsDocument),
    ])

    if (!resCategories.categories?.data || !resPosts.posts?.data) {
      throw '404'
    }

    return {
      initialData: {
        categories: resCategories.categories.data || [],
        // @ts-ignore
        posts: resPosts.posts.data || [],
      }
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true
    }
  }
}

export default async function Page() {
  const {  initialData, notFound} = await getPageInitialData()
  if (notFound || !initialData) {
    return <></>
  }
  return (
    <PageHome {...initialData} />
  )
}
