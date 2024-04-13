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
  const { t } = await getTranslation(nsPageSearch)
  if (data.length < 1) {
    console.log('data.length < 1', t('no-results'))
    return <NwEmptyList title={t('no-results')} className="mt-12" />
  }
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
