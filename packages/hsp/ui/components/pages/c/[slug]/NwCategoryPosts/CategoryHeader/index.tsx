import Link from 'next/link'
import {
  NwCategoryGroupProps,
  NwCategoryProps,
} from '@hsp/ui/types/components/category.type'
import PropsWithClassName from '@hsp/ui/types/components/common.type'
import classNames from '@hsp/ui/utils/classNames'

export default function NwCategoryHeader({ data }: NwCategoryProps) {
  return (
    <div>
      <h1 className="text-4xl font-thin">{data.attributes.title}</h1>
      <ChildCategory
        data={data.attributes.child_categories || []}
        className="mt-4"
      />
    </div>
  )
}

function ChildCategory({
  data,
  className,
}: PropsWithClassName<NwCategoryGroupProps>) {
  if (!data.length) {
    return <></>
  }
  return (
    <div className={classNames('flex flex-wrap gap-2', className)}>
      {data.map((category) => {
        if (!category.attributes.slugUrl) {
          return <></>
        }
        return (
          <Link
            key={category.id}
            href={category.attributes.slugUrl}
            className="btn btn-sm hover:text-primary font-light"
          >
            <h2>{category.attributes.title}</h2>
          </Link>
        )
      })}
    </div>
  )
}
