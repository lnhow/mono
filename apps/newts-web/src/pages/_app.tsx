import '@/styles/globals.css'
import { wrapper } from '@/store'
import { Provider } from 'react-redux'
import { AppPropsWithLayout } from '@/types'

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      {getLayout(<Component {...props.pageProps} />)}
    </Provider>
  ) 
}
