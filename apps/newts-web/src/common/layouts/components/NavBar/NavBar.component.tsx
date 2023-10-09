import Link from 'next/link'
import Header from './components/Header'

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
      <Header />
    </>
  )
}
