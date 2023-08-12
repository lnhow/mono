import Link from 'next/link'

export default function NavBar() {
  return (
    <div className="w-full h-12 py-2 px-3 bg-orange-500 dark:bg-orange-900 flex items-center">
      <div>
        <Link href="/">
          <h1 className="text-xl font-bold">newts</h1>
        </Link>
      </div>
    </div>
  )
}
