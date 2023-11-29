import { Search } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import Link from 'next/link'

const SearchButton = function SearchButton() {
  return (
    <IconButton
      className="rounded [&_.MuiTouchRipple-root_.MuiTouchRipple-child]:rounded text-black dark:text-white"
      LinkComponent={Link}
      href='/search'
    >
      <Search />
    </IconButton>
  )
}

export default SearchButton
