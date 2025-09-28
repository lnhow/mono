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
    console.log('Rendering heading:', tagName, id, children)
    return createElement(
      tagName,
      {
        ...props,
        id,
        className: 'group scroll-mt-20 relative flex items-center',
      },
      children,
      id &&
        createElement(
          'a',
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
