import Link from 'next/link'
import Header from './components/Header'
import dynamic from 'next/dynamic'

const ThemeChanger = dynamic(
  () => import('@newts/common.gui/components/ThemeChanger'),
  { ssr: false }
)

export default function NavBar() {
  return (
    <>
      <div className="w-full h-12">
        <div className="max-w-screen-2xl h-12 mx-auto py-2 px-3 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-xl font-bold">newts</h1>
          </Link>
          <ThemeChanger />
        </div>
      </div>
      <Header />
    </>
  )
}
