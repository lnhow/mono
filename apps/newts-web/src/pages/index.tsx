import { Inter } from 'next/font/google'
import { GetAllPostsDocument, GetAllPostsQuery, GetParentCategoriesDocument, GetParentCategoriesQuery } from '@/utils/graphql/_generated/graphql'
import { strapiGraphql } from '@/utils/graphql/graphqlClient'

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

    console.log(resCategories.categories?.data, resPosts.posts?.data)

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

export default function Home({ categories, posts }: IHomePageProps) {
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

interface ICategory {
  id: number,
  attributes: {
    title?: string,
    slugUrl?: string,
  }
}

const CategoryItem = ({ category }: {category: ICategory}) => {
  return (
    <a
      href={`/c/${category.attributes.slugUrl}`}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className={'mb-3 text-2xl font-semibold'}>
        {category.attributes.title + ' '}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      {/* <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        Find in-depth information about Next.js features and API.
      </p> */}
    </a>
  )
}

interface IPost {
  id: number,
  attributes: {
    title?: string,
    slugUrl?: string,
    description?: string,
    cover?: string,
    content?: string,
  }
}

const PostItem = ({ post }: {post: IPost}) => {
  return (
    <a
      href={`/p/${post.attributes.slugUrl}`}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className={'mb-3 text-2xl font-semibold'}>
        {post.attributes.title + ' '}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className={'m-0 max-w-[30ch] text-sm opacity-50'}>
        {post.attributes.description}
      </p>
    </a>
  )
}