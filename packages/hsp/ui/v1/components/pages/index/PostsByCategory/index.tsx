import { NwCategoryProps } from '@hsp/ui/v1/types/components/category.type'
import { NwPostGroupProps } from '@hsp/ui/v1/types/components/posts.type'
import CategoryTitle from './components/CategoryTitle'
import PostGroup from './components/PostsGroup'

export default async function NwPostsByCategory({
  data,
  categoryData,
}: NwPostGroupProps & { categoryData: NwCategoryProps['data'] }) {
  if (!data || data.length < 1 || !categoryData.id) {
    return <></>
  }

  return (
    <CategoryTitle data={categoryData}>
      <PostGroup data={data} />
    </CategoryTitle>
  )
}
