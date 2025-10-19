import { createElement } from 'react'
import { MdLink } from 'react-icons/md'
import Link from '@hsp/ui/components/app/link'

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
        className: 'group scroll-mt-20 relative flex items-center break-words',
      },
      createElement('span', {
        className: 'break-words max-w-full',
      }, children),
      id &&
        createElement(
          Link,
          {
            href: `#${id}`,
            className:
              'opacity-0 group-hover:opacity-100 transition-opacity !text-fore-200 !hover:text-fore-400 ml-4 inline-block',
            'aria-label': `Link to section`,
          },
          createElement(MdLink, {
            className: 'w-6 h-6 flex-shrink-0',
          }),
        ),
    )
  }
}
