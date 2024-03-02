import { getTranslation } from '@i18n/server'
import NwEmptyList from '@newts/ui/components/common/NwPost/NwPostList/Empty'
import NwPostsWithPagination, {
  NwPostsWithPaginationProps,
} from '@newts/ui/components/common/NwPost/NwPostList/WithPagination'
import { nsPageSearch } from '../types'

export default async function NwSearchList({
  data,
  pagination,
}: NwPostsWithPaginationProps) {
  if (data.length < 1) {
    return <NwEmptyList className="mt-12" />
  }
  const { t } = await getTranslation(nsPageSearch)
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">
          {t('result', { count: pagination.total })}
        </h1>
      </div>
      <NwPostsWithPagination data={data} pagination={pagination} />
    </>
  )
}
