import QuestionMarkIcon from '@mui/icons-material/QuestionMark'

export default function NwEmptyList({ title = 'No results found' }: { title?: string }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <QuestionMarkIcon className="w-20 h-20 text-neutral-content" />
      <div className="text-neutral-content text-sm mt-4">{title}</div>
    </div>
  )
}
