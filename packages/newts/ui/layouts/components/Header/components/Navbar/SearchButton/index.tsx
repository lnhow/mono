import { Search } from '@mui/icons-material'
import Link from 'next/link'

const SearchButton = function SearchButton() {
  return (
    <Link
      className="btn btn-square btn-ghost"
      href='/search'
    >
      <Search />
    </Link>
  )
}

export default SearchButton
