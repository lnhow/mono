import { NwPostGroupProps } from '@newts/ui/types/components/posts.type'
import NwPostBase from '@newts/ui/components/common/NwPost/NwPostBase'
import TopCategoryPost from './TopCategoryPost'

export default function PostGroup({ data }: NwPostGroupProps) {
  const sidePosts = data.slice(1, 3)

  return (
    <div className="grid grid-cols-1 gap-4">
      <TopCategoryPost data={data[0]} />
      <div className="flex flex-col md:max-lg:flex-row gap-4">
        {sidePosts.map((post, index) => (
          <div key={index} className="max-lg:flex-1">
            <NwPostBase data={post} />
          </div>
        ))}
      </div>
    </div>
  )
}
