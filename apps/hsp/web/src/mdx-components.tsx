// https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components
import type { MDXComponents } from 'mdx/types'
import Link from '@hsp/ui/src/components/app/link'
import Image, { ImageProps } from '@hsp/ui/src/components/app/image'

const mdxComponents: MDXComponents = {
  // Basic HTML elements with some Tailwind CSS styling
  h1: (props) => <h1 className='text-3xl font-light text-fore-400 my-4' {...props} />,
  h2: (props) => <h2 className='text-2xl font-bold text-fore-400 my-4' {...props} />,
  h3: (props) => <h3 className='text-xl font-bold text-fore-400 my-4' {...props} />,
  h4: (props) => <h4 className='text-lg font-bold text-fore-400 my-4' {...props} />,
  h5: (props) => <h5 className='text-base font-bold text-fore-400 my-4' {...props} />,
  h6: (props) => <h6 className='text-sm font-bold text-fore-400 my-4' {...props} />,
  p: (props) => <p className='my-2 text-fore-300' {...props} />,
  a: (props) => <Link className='text-primary-400 underline' {...props} />,
  ul: (props) => <ul className='list-disc text-fore-300 list-inside my-2' {...props} />,
  ol: (props) => <ol className='list-decimal text-fore-300 list-inside my-2' {...props} />,
  li: (props) => <li className='my-1' {...props} />,
  blockquote: (props) => (
    <blockquote className='border-l-4 border-fore-400 bg-base-400 pl-4 py-2 italic my-4' {...props} />
  ),
  // Inline code
  code: (props) => (
    <code className='bg-base-200 text-fore-300 px-1 rounded' {...props} />
  ),
  // Code block
  pre: (props) => (
    <pre className='bg-base-200 text-fore-300 p-4 rounded my-4 overflow-x-auto' {...props} />
  ),
  hr: (props) => <hr className='my-4 border-fore-300' {...props} />,
  Image: (props: ImageProps) => <Image className='my-4 rounded' sizes="100vw"
      // style={{ width: '100%', height: 'auto' }}
      {...props} />,
  table: (props) => (
    <table className='table-auto border-collapse border border-fore-300 my-4' {...props} />
  ),
  th: (props) => (
    <th className='border border-fore-300 bg-fore-200 px-4 py-2' {...props} />
  ),
  td: (props) => <td className='border border-fore-300 px-4 py-2' {...props} />,
  tr: (props) => <tr className='hover:bg-fore-100' {...props} />,
}

export function useMDXComponents(): MDXComponents {
  return mdxComponents
}

