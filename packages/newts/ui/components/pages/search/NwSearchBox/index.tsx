import SubmitButton from './SubmitButton'

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
        name="query"
        role="searchbox"
        type="text"
        autoFocus
        defaultValue={data.query || ''}
        className="input input-bordered text-sm font-light flex-1"
        placeholder="Article, category, or tag"
      />
      <SubmitButton />
    </form>
  )
}
