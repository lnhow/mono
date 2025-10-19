import NwPostsWithPagination, {
  NwPostsWithPaginationProps,
} from '@hsp/ui/v1/components/common/NwPost/NwPostList/WithPagination'
import NwEmptyList from '@hsp/ui/v1/components/common/NwPost/NwPostList/Empty'
import { getTranslation } from '@i18n/server'

export default async function NwCategoryPosts({
  data,
  pagination,
}: NwPostsWithPaginationProps) {
  if (data.length < 1) {
    const { t } = await getTranslation('page@category')
    return <NwEmptyList title={t('no-posts')} className='mt-12' />
  }
  return (
    <>
      <NwPostsWithPagination data={data} pagination={pagination} />
    </>
  )
}
