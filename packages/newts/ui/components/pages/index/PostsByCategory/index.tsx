import { NwPostGroupProps } from '../../../../types/components/posts.type'
import NwPostsByCategorySkeleton from './skeleton'

export default async function NwPostsByCategory({ data }: NwPostGroupProps) {
  if (!data || data.length < 1) {
    return <></>
  }

  return (
    <div>
      {data[0].attributes.title}
      <NwPostsByCategorySkeleton />
    </div>
  )
}
