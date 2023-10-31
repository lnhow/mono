import TopPost from './components/TopPost'
import SidePost from './components/SidePost'
import { NwPostGroupProps } from '../../../../types/components/posts.type'

export default function NwFeaturedPosts({ data }: NwPostGroupProps) {
  if (!data || data.length < 1) {
    return <></>
  }
  const sidePosts = data.slice(1, 3)

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <TopPost data={data[0]} />
      <div className="flex flex-col md:max-lg:flex-row gap-4">
        {sidePosts.map((post, index) => (
          <div key={index} className='max-lg:flex-1'>
            <SidePost data={post} />
          </div>
        ))}
      </div>
    </section>
  )
}
