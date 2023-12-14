import { MdOutlineSearch } from 'react-icons/md'
import Link from 'next/link'

const SearchButton = function SearchButton() {
  return (
    <Link
      className="btn btn-square btn-ghost"
      href='/search'
    >
      <MdOutlineSearch className='icon-md' />
    </Link>
  )
}

export default SearchButton
