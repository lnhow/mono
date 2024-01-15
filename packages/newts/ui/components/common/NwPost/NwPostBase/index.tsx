import Link from 'next/link'
import { NwPostProps } from '@newts/ui/types/components/posts.type'
import NwPostImage from '../NwPostImage'
import classNames from '@newts/ui/utils/classNames'

export type NwPostBaseProps = {
  styles?: {
    container?: string
    cover?: NwPostCoverProps['styles']
    content?: NwPostContentProps['styles']
  }
} & NwPostProps

export default function NwPostBase({ data, styles }: NwPostBaseProps) {
  const hrefUrl = data.attributes.slugUrl
    ? `/p/${data.attributes.slugUrl}`
    : '#'
  const coverUrl = data.attributes.cover?.attributes.url || undefined
  const title = data.attributes.title || ''
  const description = data.attributes.description || ''

  return (
    <article className={classNames('flex', styles?.container)}>
      <NwPostCover
        coverUrl={coverUrl}
        hrefUrl={hrefUrl}
        title={title}
        styles={styles?.cover}
      />
      <NwPostContent
        hrefUrl={hrefUrl}
        title={title}
        description={description}
        styles={styles?.content}
      />
    </article>
  )
}

export type NwPostCoverProps = {
  coverUrl?: string
  hrefUrl: string
  title: string
  styles?: string
}

export function NwPostCover({
  coverUrl,
  hrefUrl,
  title,
  styles,
}: NwPostCoverProps) {
  return (
    <>
      {coverUrl && (
        <div className={classNames('shrink-0 w-40 overflow-hidden', styles)}>
          <Link href={hrefUrl} title={title}>
            <NwPostImage src={coverUrl} alt={title || ''} />
          </Link>
        </div>
      )}
    </>
  )
}

export type NwPostContentProps = {
  hrefUrl: string
  title: string
  description: string
  styles?: {
    container?: string
    title?: string
    description?: string
  }
}

export function NwPostContent({
  hrefUrl,
  title,
  description,
  styles,
}: NwPostContentProps) {
  return (
    <div
      className={classNames(
        'ml-2 min-w-0 flex-[2] py-2 pr-2',
        styles?.container
      )}
    >
      <Link href={hrefUrl} title={title}>
        <h2
          className={classNames(
            'text-md font-extralight line-clamp-1 lg:line-clamp-2',
            styles?.title
          )}
        >
          {title}
        </h2>
      </Link>
      <p
        className={classNames(
          'mt-2 text-xs font-light line-clamp-3 lg:line-clamp-2',
          styles?.description
        )}
      >
        {description}
      </p>
    </div>
  )
}
