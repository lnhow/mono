'use client'
import { Search } from '@mui/icons-material'
import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className="btn btn-square btn-primary ml-2"
      disabled={pending}
      aria-disabled={pending}
    >
      <Search />
    </button>
  )
}
