import Link from 'next/link'
import { NwPostProps } from '@hsp/ui/types/components/posts.type'
import NwPostImage from '../components/NwPostImage'
import { NwPostContentProps, NwPostCoverProps } from '../NwPostBase'
import cn from '@hsp/ui/utils/cn'

export type NwPostHeroProps = {
  styles?: {
    container?: string
    cover?: NwPostCoverProps['styles']
    content?: NwPostHeroContentProps['styles']
  }
} & NwPostProps

export default function NwPostHero({ data, styles }: NwPostHeroProps) {
  const hrefUrl = data.attributes.slugUrl
    ? `/p/${data.attributes.slugUrl}`
    : '#'
  const coverUrl = data.attributes.cover?.attributes.url || undefined
  const title = data.attributes.title || ''
  const description = data.attributes.description || ''

  return (
    <article className="lg:col-span-2 relative">
      <div className="flex flex-col md:flex-row gap-2">
        <NwPostHeroCover
          title={title}
          hrefUrl={hrefUrl}
          coverUrl={coverUrl}
          styles={styles?.cover}
        />
        <NwPostHeroContent
          title={title}
          hrefUrl={hrefUrl}
          description={description}
          styles={styles?.content}
          />
      </div>
    </article>
  )
}

export const NwPostHeroCover = ({
  coverUrl,
  hrefUrl,
  title,
  styles,
  propsImage,
}: NwPostCoverProps) => {
  return (
    <div className={cn('shrink-0 w-full sm:w-3/5 md:w-1/2 lg:w-2/3', styles)}>
      <Link href={hrefUrl} title={title}>
        <NwPostImage
          priority
          loading="eager"
          src={coverUrl || ''}
          alt={title}
          roundedSize="rounded-xl"
          {...propsImage}
        />
      </Link>
    </div>
  )
}

export type NwPostHeroContentProps = {
  styles?: {
    titleContainer?: string
    descriptionContainer?: string
  } & NwPostContentProps['styles']
} & NwPostContentProps

export const NwPostHeroContent = ({
  hrefUrl,
  title,
  description,
  styles,
}: NwPostHeroContentProps) => {
  return (
    <div
      className={cn(
        'min-w-0 z-10 absolute flex flex-col items-end w-2/3 right-2 top-1/4',
        styles?.container
      )}
    >
      <div
        className={cn(
          'bg-base-300/95 p-2 rounded-lg',
          styles?.titleContainer
        )}
      >
        <Link href={hrefUrl} title={title}>
          <h2
            className={cn(
              'md:text-base text-sm font-extralight line-clamp-2',
              styles?.title
            )}
          >
            {title}
          </h2>
        </Link>
      </div>
      <div
        className={cn(
          'w-[75%] mt-1 p-1 rounded-md bg-base-100/90 invert',
          styles?.descriptionContainer
        )}
      >
        <p
          className={cn(
            'font-light text-ellipsis line-clamp-2 text-xs',
            styles?.description
          )}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
