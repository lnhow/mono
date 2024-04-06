import { AppProps } from 'next/app'

export default function App({ Component, ...rest }: AppProps) {
  return <Component {...rest} />
}
