import { createElement } from 'react'
import { MdLink } from 'react-icons/md'

export default function createHeading(
  tagName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
) {
  return function Heading({
    id,
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) {
    return createElement(
      tagName,
      {
        ...props,
        id,
        className: 'group scroll-mt-20 relative',
      },
      children,
      id &&
        createElement(
          'a',
          {
            href: `#${id}`,
            className:
              'opacity-0 group-hover:opacity-100 transition-opacity text-fore-200 hover:text-fore-400 ml-2 inline-block align-baseline',
            'aria-label': `Link to section`,
          },
          createElement(MdLink, { className: 'h-4 w-4 flex-shrink-0' }),
        ),
    )
  }
}
