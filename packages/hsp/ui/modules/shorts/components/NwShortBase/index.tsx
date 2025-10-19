import Image from 'next/image'
import Link from '@hsp/ui/shared/components/navigation/Link'
import cn from '@hsp/ui/utils/cn'
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
        className={cn(
          'group flex card image-full h-full hover:shadow-lg transition-shadow duration-300 ease-in-out',
          'before:bg-gradient-to-br before:from-base-300 before:to-base-100',
          'before:!opacity-0 hover:before:!opacity-60 before:transition-opacity before:duration-200 before:ease-in-out',
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
          className={cn(
            'card-body justify-end items-end px-4 py-6 text-text-300',
            styles?.container
          )}
        >
          <h4
            className={cn(
              'text-lg font-bold lg:line-clamp-2 py-1 px-2 rounded-lg shadow-sm text-text-300',
              'bg-gradient-to-br from-base-100 bg-base-300 bg-opacity-80',
              'border-r-2 group-hover:border-r-4 border-neutral transition-[border] duration-200 ease-in-out',
              styles?.content?.title
            )}
          >
            {title}
          </h4>
          <div className="mt-1 max-w-[90%]">
            <div className="bg-gradient-to-br from-base-300 bg-base-100 bg-opacity-60 p-2 shadow-sm rounded-sm text-text-300">
              <p
                className={cn('text-sm', styles?.content?.description)}
              >
                {description}
              </p>
              <div className="text-right text-sm font-bold">
                {data.source.author}
                {data.source.site ? ` (${data.source.site})` : <></>}
              </div>
            </div>
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
