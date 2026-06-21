import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

export const mdxComponents: MDXComponents = {
  a: ({ href = '', ...props }) =>
    href.startsWith('/') ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} rel="noreferrer" target="_blank" {...props} />
    ),
}
