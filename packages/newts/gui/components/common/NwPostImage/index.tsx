import Image from 'next/image'
import { ComponentPropsWithoutRef } from 'react'

export type NwPostImageProps = ComponentPropsWithoutRef<typeof Image> & {
  roundedSize?: string
}

export default function NwPostImage({
  src,
  alt,
  roundedSize = 'rounded-md',
  className,
  ...props
}: NwPostImageProps) {
  return (
    <div className="relative pb-[75%]">
      <Image
        loading="lazy"
        src={src || ''}
        alt={alt || ''}
        width={0}
        height={0}
        sizes="100vw"
        className={
          (className ? `${className} ` : '') +
          `w-full h-full object-cover absolute inset-0 ${roundedSize} border-2 border-bgprimary-200 dark:border-bgprimary-800`
        }
        {...props}
      />
    </div>
  )
}
