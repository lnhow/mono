import '@/styles/globals.css'
import { wrapper } from '@/common/store'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  // const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  ) 
}
