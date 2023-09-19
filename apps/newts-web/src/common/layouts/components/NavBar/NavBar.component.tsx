import Link from 'next/link'
import ListCategory from './components/ListCategory'
import { Suspense } from 'react'

export type NavBarProps = {
  // categories: ListCategoryProps['categories']
}

export default function NavBar() {
  return (
    <>
      <div className="w-full h-12">
        <div className='max-w-screen-2xl mx-auto py-2 px-3 flex items-center'>
          <Link href="/">
            <h1 className="text-xl font-bold">newts</h1>
          </Link>
        </div>
      </div>
      <Suspense>
        <ListCategory />
      </Suspense>
    </>
  )
}
