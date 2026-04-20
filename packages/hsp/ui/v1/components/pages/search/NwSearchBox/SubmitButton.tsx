'use client'
import { useFormStatus } from 'react-dom'
import { MdOutlineSearch } from 'react-icons/md'

export default function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className="btn btn-square btn-primary ml-2"
      disabled={pending}
      aria-disabled={pending}
    >
      <MdOutlineSearch className="icon-md" />
    </button>
  )
}
