import { memo } from 'react'
import Link from 'next/link'

import ThemeChanger from '@hsp/ui/components/ThemeChanger'
import NoSsr from '../../../../../components/utils/NoSsr'

const HeaderLeading = memo(function HeaderLeading() {
  return (
    <div className="w-full h-12">
      <div className="max-w-screen-2xl h-12 mx-auto py-2 px-3 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-extralight">hammerspc</h1>
        </Link>
        <NoSsr>
          <ThemeChanger />
        </NoSsr>
      </div>
    </div>
  )
})

export default HeaderLeading
