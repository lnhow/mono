import { Inter } from 'next/font/google'
import { GetAllPostsDocument, GetAllPostsQuery, GetParentCategoriesDocument, GetParentCategoriesQuery } from '@/utils/graphql/_generated/graphql'
import { strapiGraphql } from '@/utils/graphql/graphqlClient'
import { CategoryItem, ICategory } from '@/components/pages/index/ListCategory'
import { IPost, PostItem } from '@/components/pages/index/ListPosts'
import { NextPageWithLayout } from '@/types'
import LayoutDefault from '@/layouts/LayoutDefault'

const inter = Inter({ subsets: ['latin'] })

interface IHomePageProps {
  categories: ICategory[],
  categories2: GetParentCategoriesQuery,
  posts: IPost[],
}

export const getServerSideProps = async () => {
  try {
    const [
      resCategories,
      resPosts,
    ] = await Promise.all([
      strapiGraphql.request<GetParentCategoriesQuery>(GetParentCategoriesDocument),
      strapiGraphql.request<GetAllPostsQuery>(GetAllPostsDocument),
    ])

    if (!resCategories.categories?.data || !resPosts.posts?.data) {
      throw '404'
    }

    return {
      props: {
        categories: resCategories.categories.data || [],
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

const Home: NextPageWithLayout<IHomePageProps> = ({ categories, posts }: IHomePageProps) => {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <div>
        <div>
          Chuyên mục
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
            {categories.map((item) => {
              return (
                <CategoryItem key={item.id} category={item} />
                )
              })}
          </div>
        </div>
        <div className='mt-2'>
          Bài viết
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
            {posts.map((item) => {
              return (
                <PostItem key={item.id} post={item} />
                )
              })}
          </div>
        </div>
      </div>
    </main>
  )
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <LayoutDefault>
      {page}
    </LayoutDefault>
  )
}

export default Home
