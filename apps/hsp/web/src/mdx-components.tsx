import type { MDXComponents } from 'mdx/types'

import Link from '@hsp/ui/modules/posts/mdx/override/link'
import createHeading from '@hsp/ui/modules/posts/mdx/override/heading'
import Image, { ImageProps } from '@hsp/ui/components/image'

export const mdxComponents: MDXComponents = {
  h1: createHeading('h1'),
  h2: createHeading('h2'),
  h3: createHeading('h3'),
  h4: createHeading('h4'),
  h5: createHeading('h5'),
  h6: createHeading('h6'),
  a: (props) => <Link {...props} />,
  Image: (props: ImageProps) => <Image {...props} />,
}
