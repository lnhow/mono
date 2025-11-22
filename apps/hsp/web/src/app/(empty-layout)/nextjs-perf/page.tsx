import Comparison from './_components/comparison'

export const metadata = {
  title: 'NextJS Comparison',
}

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Comparison />
    </div>
  )
}
