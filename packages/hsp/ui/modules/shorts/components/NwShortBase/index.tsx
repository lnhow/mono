import Image from 'next/image'
import Link from '@hsp/ui/shared/components/navigation/Link'
import classNames from '@hsp/ui/utils/classNames'
import { TShort } from '../../shorts'

export type NwShortBaseProps = {
  styles?: {
    container?: string
    wrapper?: string
    content?: NwShortContentProps['styles']
  }
} & {
  data: TShort
}

export default function NwShortBase({ data, styles }: NwShortBaseProps) {
  const hrefUrl = data.source.link || '#'
  const coverUrl = data.cover
  const title = data.title || ''
  const description = data.description || ''

  return (
    <Link
      href={hrefUrl}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      className={styles?.wrapper}
    >
      <article
        className={classNames(
          'group flex card image-full h-full hover:shadow-lg transition-shadow duration-300 ease-in-out',
          'before:bg-gradient-to-br before:from-base-300 before:to-base-100',
          styles?.container
        )}
      >
        {coverUrl && (
          <figure>
            <Image
              loading="lazy"
              src={coverUrl || ''}
              alt={title || ''}
              width={320} // 16:9
              height={180}
              className="w-full h-full object-cover"
            />
          </figure>
        )}
        <div
          className={classNames(
            'card-body justify-end items-end px-4 py-6',
            styles?.container
          )}
        >
          <h4
            className={classNames(
              'text-lg font-bold lg:line-clamp-2 py-1 px-2 rounded-lg shadow-sm',
              'bg-gradient-to-br from-base-100 bg-base-300 bg-opacity-80',
              'border-r-2 group-hover:border-r-4 border-primary transition-[border] duration-200 ease-in-out',
              styles?.content?.title
            )}
          >
            {title}
          </h4>
          <div className="mt-1 max-w-[90%]">
            <p
              className={classNames(
                'text-sm p-2 shadow-sm rounded-sm',
                'bg-gradient-to-br from-base-300 bg-base-100 bg-opacity-60',
                styles?.content?.description
              )}
            >
              {description}
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}

export type NwShortContentProps = {
  styles?: {
    container?: string
    title?: string
    description?: string
  }
}
