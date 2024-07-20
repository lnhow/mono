import { memo } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ThemeChanger = dynamic(
  () => import('@hsp/ui/components/ThemeChanger'),
  { ssr: false }
)

const HeaderLeading = memo(function HeaderLeading() {
  return (
    <div className="w-full h-12">
      <div className="max-w-screen-2xl h-12 mx-auto py-2 px-3 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-extralight">hammerspc</h1>
        </Link>
        <ThemeChanger />
      </div>
    </div>
  )
})

export default HeaderLeading
