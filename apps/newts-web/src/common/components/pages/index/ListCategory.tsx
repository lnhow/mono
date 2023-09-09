import Link from 'next/link'

export interface ICategory {
  id: string
  attributes: {
    slugUrl?: string
    title?: string
  }
}

export const CategoryItem = ({ category }: { category: ICategory }) => {
  return (
    <Link
      href={`/c/${category.attributes?.slugUrl}`}
      title={category.attributes?.title || ''}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h2 className={'mb-3 text-2xl font-semibold'}>
        {category.attributes?.title + ' '}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      {/* <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        Find in-depth information about Next.js features and API.
      </p> */}
    </Link>
  )
}
