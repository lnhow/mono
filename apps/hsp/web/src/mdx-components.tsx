import Image, { type ImageProps } from '@hsp/ui/components/image'
import createHeading from '@hsp/ui/modules/posts/mdx/override/heading'
import Link from '@hsp/ui/modules/posts/mdx/override/link'
import type { MDXComponents } from 'mdx/types'
import type { AnchorHTMLAttributes } from 'react'

export const mdxComponents: MDXComponents = {
  h1: createHeading('h1'),
  h2: createHeading('h2'),
  h3: createHeading('h3'),
  h4: createHeading('h4'),
  h5: createHeading('h5'),
  h6: createHeading('h6'),
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <Link {...props} />,
  Image: (props: ImageProps) => <Image {...props} />,
}
