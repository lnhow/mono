export default function Footer() {
  return (
    <footer className="dark:bg-bgprimary-800 bg-bgprimary-300">
      <div className="max-w-screen-2xl mx-auto p-4 flex justify-end">
        <div className="flex items-center">
          <p className="text-xs font-light">
            © {new Date().getFullYear()} Newts by{' '}
            <a href="https://github.com/lnhow" className="font-extralight">haoln</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
