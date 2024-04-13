import { MdOutlineSearch } from 'react-icons/md'
import Link from 'next/link'
import { getRequestLocale } from '@i18n/server'

const SearchButton = function SearchButton() {

  return (
    <Link
      className="btn btn-square btn-ghost"
      href='/search'
      locale={getRequestLocale()}
    >
      <MdOutlineSearch className='icon-md' />
    </Link>
  )
}

export default SearchButton
