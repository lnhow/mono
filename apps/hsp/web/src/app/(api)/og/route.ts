import { NextRequest } from 'next/server'
import { generateImage } from './_og.service'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Hao Le'
  const description =
    searchParams.get('description') || 'Web Developer. Photography and UX Enthusiast.'

  return generateImage({
    title,
    description,
    style: {
      h1: { fontSize: title.length > 50 ? '3rem' : '5rem' },
      h2: { fontSize: description.length > 100 ? '1.5rem' : '1.75rem' },
      container: { padding: title.length > 50 ? '5rem' : '10rem' },
    }
  })
}
