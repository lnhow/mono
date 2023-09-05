// import '@/styles/globals.css'
// import { wrapper } from '@/common/store'
// import { Provider } from 'react-redux'
import { AppProps } from 'next/app'

export default function App({ Component, ...rest }: AppProps) {
  // const { store, props } = wrapper.useWrappedStore(rest)

  return (
    // <Provider store={store}>
      <Component
        {...rest}
        // {...props.pageProps}
      />
    // </Provider>
  ) 
}
