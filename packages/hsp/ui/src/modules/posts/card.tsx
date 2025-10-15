import cn from '@hsp/ui/src/utils/cn'
import Link from '../../components/app/link'
import ViewTransition from '../../components/app/ViewTransition'
import { Card, CardDescription, CardTitle } from '../../components/base/card'
import { HsPost, PostUtils } from './utils'

export type CardPostProps = {
  className?: string
} & HsPost

export default function CardPost({
  title,
  description,
  slug,
  // imgSrc,
  className = '',
}: CardPostProps) {
  const transitionName = PostUtils.getTransitionName(slug)
  const href = PostUtils.slugToUrl(slug)

  return (
    <ViewTransition name={transitionName.card}>
      <Card
        className={cn(
          'flex flex-col p-4 h-full min-h-32 transition outline-fore-100 hover:outline relative',
          className,
        )}
      >
        <ViewTransition name={transitionName.title}>
          <Link
            href={href}
            className="before:absolute before:inset-0 before:z-10"
            aria-label={title}
          >
            <CardTitle className="mb-6">
              <h3 className="text-md font-normal text-fore-400">{title}</h3>
            </CardTitle>
          </Link>
        </ViewTransition>
        <ViewTransition name={transitionName.description}>
          <CardDescription className="text-fore-200">
            <p>{description}</p>
          </CardDescription>
        </ViewTransition>
      </Card>
    </ViewTransition>
  )
}
