import { Search } from '@mui/icons-material'

export type NwSearchData = {
  query?: string
  category?: string
}

export type NwSearchBoxProps = {
  data: NwSearchData
  onSearch?: (formData: FormData) => void
}

export default function NwSearchBox({ data, onSearch }: NwSearchBoxProps) {
  return (
    <form action={onSearch} className="flex flex-row">
      <input
        name='query'
        role='searchbox'
        type="text"
        defaultValue={data.query || ''}
        className="input input-bordered input-primary text-sm font-light flex-1"
        placeholder="Article, category, or tag"
      />
      <button type="submit" className="btn btn-square btn-primary ml-2">
        <Search />
      </button>
    </form>
  )
}
