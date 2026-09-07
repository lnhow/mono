import { Metadata } from 'next'
import Canvas from './components/Canvas'

export const metadata: Metadata = {
  title: 'Bong bóng bay',
  description: 'Bong bóng bay quả bong bóng bay. Em chuyền tay bạn bóng bay lên trời',
}

export default function Page() {
  return <Canvas />
}
