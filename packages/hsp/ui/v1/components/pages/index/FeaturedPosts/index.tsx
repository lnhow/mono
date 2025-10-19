import { NwPostGroupProps } from '@hsp/ui/../v1/types/components/posts.type'
import NwPostBase from '@hsp/ui/../v1/components/common/NwPost/NwPostBase'
import NwPostHero from '../../../common/NwPost/NwPostHero'

export default function NwFeaturedPosts({ data }: NwPostGroupProps) {
  if (!data || data.length < 1) {
    return <></>
  }
  const sidePosts = data.slice(1)

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <NwPostHero data={data[0]}
        styles={{
          cover: '!sm:w-3/5 !md:w-2/3',
          content: {
            titleContainer: '!p-3 md:!p-4',
            title: '!text-xl md:!text-2xl',
            descriptionContainer: '!p-2',
            description: '!lg:line-clamp-3 lg:!text-sm',
          }
        }}
      />
      <div className="flex flex-col md:max-lg:flex-row gap-4">
        {sidePosts.map((post, index) => (
          <div key={index} className='max-lg:flex-1'>
            <NwPostBase data={post} />
          </div>
        ))}
      </div>
    </section>
  )
}
