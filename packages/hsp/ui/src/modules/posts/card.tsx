import cn from '@hsp/ui/utils/cn'
import Link from '../../components/app/link'
import ViewTransition from '../../utils/react/view-transition'
import { Card, CardDescription, CardTitle } from '../../components/base/card'
import { HsPost, PostUtils } from './utils'

export type CardPostProps = {
  className?: string
} & HsPost

export default function CardPost({
  title,
  description,
  slug,
  readingTimeMinutes,
  createdAt,
  tags,
  // imgSrc,
  className = '',
}: CardPostProps) {
  const transitionName = PostUtils.getTransitionName(slug)
  const href = PostUtils.slugToUrl(slug)
  const createdDate = PostUtils.formatDate(createdAt)

  return (
    <ViewTransition name={transitionName.card}>
      <Card
        asChild
        className={cn(
          'flex flex-col px-4 py-5 h-full min-h-32 transition outline-fore-100 hover:outline relative',
          className,
        )}
      >
        <article>
          <ViewTransition name={transitionName.stats}>
            <CardDescription className="font-mono text-xs text-fore-200">
              <time dateTime={createdAt.toISOString()}>{createdDate}</time>
              {readingTimeMinutes && (
                <>
                  <span> • </span>
                  <span>{Math.ceil(readingTimeMinutes)} min read</span>
                </>
              )}
            </CardDescription>
          </ViewTransition>
          <CardTitle className="mt-2">
            <Link
              href={href}
              className="before:absolute before:inset-0"
              aria-label={title}
            >
              <ViewTransition name={transitionName.title}>
                <h3 className="text-md font-normal text-fore-400">{title}</h3>
              </ViewTransition>
            </Link>
          </CardTitle>
          <PostTags
            tags={tags}
            transitionName={transitionName.tag}
            className="mt-2  text-fore-100"
          />
          <ViewTransition name={transitionName.description}>
            <CardDescription className="text-fore-200 mt-2">
              <p>{description}</p>
            </CardDescription>
          </ViewTransition>
        </article>
      </Card>
    </ViewTransition>
  )
}

export const PostTags = ({
  tags,
  transitionName,
  className,
}: {
  tags: HsPost['tags']
  transitionName: string
  className?: string
}) => {
  if (!tags || tags.length === 0) {
    return null
  }

  return (
    <ViewTransition name={transitionName}>
      <div className={cn('flex flex-wrap gap-2 text-xs font-mono', className)}>
        {tags.map((tag) => (
          <span key={tag}>#{tag.toLowerCase()}</span>
        ))}
      </div>
    </ViewTransition>
  )
}
