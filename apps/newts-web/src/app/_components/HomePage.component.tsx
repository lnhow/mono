'use client'
import { Inter } from 'next/font/google'
import { CategoryItem, ICategory } from '@/common/components/pages/index/ListCategory'
import { IPost, PostItem } from '@/common/components/pages/index/ListPosts'



export interface IPageHomeProps {
  categories: ICategory[],
  posts: IPost[],
}

const inter = Inter({ subsets: ['latin'] })

const PageHome = ({ categories, posts }: IPageHomeProps) => {
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

export default PageHome
