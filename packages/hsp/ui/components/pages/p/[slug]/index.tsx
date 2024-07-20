import { MdOutlineHome } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'

import NwCategory from '@hsp/ui/types/category'
import Maybe from '@hsp/ui/types/common/maybe'
import NwPost from '@hsp/ui/types/post'

import PublishDate from './client/PublishDate'

const EMPTY_DISPLAY = '(This post is empty. Comeback later)'

export default function PageView({ post }: { post: NwPost }) {
  const nwPost = post
  const postCoverUrl = nwPost.attributes?.cover?.attributes?.url
  const postTitle = post.attributes?.title

  return (
    <>
      <PostBreadcrumb category={nwPost.attributes.category} />
      <article>
        <section className="p-4 md:px-8 md:py-6">
          {/* Post header */}
          <h3 className="text-3xl md:text-4xl">{postTitle}</h3>
          {/* Post metadata */}
          <div className="pt-2">
            <PublishDate date={post.attributes?.publishedAt || ''} />
          </div>
        </section>
        {/* Post content */}
        <section className="max-w-full min-h-[50vh] rounded-2xl bg-base-200">
          {postCoverUrl && (
            <Image
              src={postCoverUrl}
              alt={postTitle || 'Cover image'}
              width={1200}
              height={900}
              priority
              className="w-full h-80 rounded-2xl object-contain bg-base-300"
            />
          )}
          <Markdown
            remarkPlugins={[remarkGfm]}
            className="p-4 md:px-8 md:py-12 prose prose-black dark:prose-invert max-w-full break-words"
          >
            {nwPost.attributes?.content || EMPTY_DISPLAY}
          </Markdown>
        </section>
      </article>
    </>
  )
}

const PostBreadcrumb = ({ category }: { category: Maybe<NwCategory> }) => {
  return (
    <div className="breadcrumbs">
      <ul>
        <li>
          <Link href="/" color="inherit" className="flex items-center">
            <MdOutlineHome className="icon-md" />
          </Link>
        </li>
        <li>
          <Link
            href={`/c/${category?.attributes?.slugUrl}`}
            color="inherit"
            className="flex items-center"
          >
            {category?.attributes?.title}
          </Link>
        </li>
      </ul>
    </div>
  )
}
