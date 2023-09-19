'use client'
import {
  ICategory,
} from '@/common/components/pages/index/ListCategory'
import { IPost, PostItem } from '@/common/components/pages/index/ListPosts'

export interface IPageHomeProps {
  categories: ICategory[]
  posts: IPost[]
}

const PageHome = ({ posts }: IPageHomeProps) => {
  return (
    <div>
      <div className="mt-2">
        Bài viết
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
          {posts.map((item) => {
            return <PostItem key={item.id} post={item} />
          })}
        </div>
      </div>
    </div>
  )
}

export default PageHome
