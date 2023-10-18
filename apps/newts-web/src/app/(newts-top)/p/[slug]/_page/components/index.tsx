import { getCategoryFromPost, getPostCoverUrl } from '@/common/utils/data/post'
import { PostEntity } from '@/common/utils/graphql/_generated/types'
import HomeIcon from '@mui/icons-material/Home'
import { Breadcrumbs, Link, Paper, Tooltip, Typography } from '@mui/material'
import Image from 'next/image'
import { default as NextLink } from 'next/link'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import PublishDate from './client/PublishDate'

const EMPTY_DISPLAY = '(This post is empty. Comeback later)'

export default function PageView({ post }: { post: PostEntity }) {
  const postCategory = getCategoryFromPost(post)
  const postCoverUrl = getPostCoverUrl(post)
  const postTitle = post.attributes?.title

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumbs separator="›" className='text-sm'>
        <Link
          component={NextLink}
          href="/"
          underline="hover"
          color="inherit"
          className="flex items-center"
        >
          <Tooltip title='Trang chủ'>
            <HomeIcon className="mr-1" />
          </Tooltip>
        </Link>
        <Link
          component={NextLink}
          href={`/c/${postCategory?.attributes?.slugUrl}}`}
          underline="hover"
          color="inherit"
          className="flex items-center"
        >
          <Tooltip title={<>{postCategory?.attributes?.title}</>}>
            <>{postCategory?.attributes?.title}</>
          </Tooltip>
        </Link>
        <Typography color="text.primary" className="flex items-center text-sm">
          {post.attributes?.title}
        </Typography>
      </Breadcrumbs>
      <section>
        <section className="p-4 md:px-8 md:py-6">
          {/* Post header */}
          <Typography variant="h3" className="text-3xl md:text-4xl">
            {post.attributes?.title}
          </Typography>
          {/* Post metadata */}
          <div className='p-2'>
            <PublishDate date={post.attributes?.publishedAt} />
          </div>
        </section>
        {/* Post content */}
        <Paper className="w-full min-h-[50vh] rounded-2xl">
          {postCoverUrl && (
            <Image
              src={postCoverUrl}
              alt={postTitle || 'Cover image'}
              width={1024}
              height={300}
              className="w-full rounded-2xl"
            />
          )}
          <ReactMarkdown className="p-4 md:px-8 md:py-12 prose prose-black dark:prose-invert max-w-full">
            {post.attributes?.content || EMPTY_DISPLAY}
          </ReactMarkdown>
        </Paper>
      </section>
    </>
  )
}
