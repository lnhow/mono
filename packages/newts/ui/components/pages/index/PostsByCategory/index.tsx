import { NwPostGroupProps } from '../../../../types/components/posts.type'
import SideCategoryPost from './components/SideCategoryPost'
import TopCategoryPost from './components/TopCategoryPost'
// import NwPostsByCategorySkeleton from './skeleton'


export default async function NwPostsByCategory({ data }: NwPostGroupProps) {
  if (!data || data.length < 1) {
    return <></>
  }
  const sidePosts = data.slice(1, 3)

  return (
    <section className="grid grid-cols-1 gap-4">
      <TopCategoryPost data={data[0]} />
      <div className="flex flex-col md:max-lg:flex-row gap-4">
        {sidePosts.map((post, index) => (
          <div key={index} className='max-lg:flex-1'>
            <SideCategoryPost data={post} />
          </div>
        ))}
      </div>
    </section>
  )
}
