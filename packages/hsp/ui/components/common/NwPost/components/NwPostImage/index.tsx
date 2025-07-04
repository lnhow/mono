import Image from 'next/image'
import { ComponentPropsWithoutRef } from 'react'
import classNames from '@hsp/ui/utils/classNames'

export type NwPostImageProps = ComponentPropsWithoutRef<typeof Image> & {
  roundedSize?: string
  wrapperClassName?: string
}

export default function NwPostImage({
  src,
  alt,
  roundedSize = 'rounded-md',
  wrapperClassName,
  className,
  ...props
}: NwPostImageProps) {
  return (
    <div
      className={
        (wrapperClassName ? `${wrapperClassName} ` : '') + 'relative pb-[75%]'
      }
    >
      <Image
        loading="lazy"
        src={src || ''}
        alt={alt || ''}
        width={0}
        height={0}
        sizes="100vw"
        className={classNames(
          `w-full h-full object-contain absolute inset-0 ${roundedSize} bg-base-300`,
          className,
        )}
        {...props}
      />
    </div>
  )
}
