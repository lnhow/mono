import { getTranslation } from '@i18n/server'
import SubmitButton from './SubmitButton'
import { nsPageSearch } from '../types'

export type NwSearchData = {
  query?: string
  category?: string
}

export type NwSearchBoxProps = {
  data: NwSearchData
  onSearch?: (formData: FormData) => void
}

export default async function NwSearchBox({ data, onSearch }: NwSearchBoxProps) {
  const { t } = await getTranslation(nsPageSearch)
  return (
    <form action={onSearch} className="flex flex-row">
      <input
        name="query"
        role="searchbox"
        type="text"
        autoFocus
        defaultValue={data.query || ''}
        className="input input-bordered text-sm font-light flex-1"
        placeholder={t('search.placeholder')}
      />
      <SubmitButton />
    </form>
  )
}
