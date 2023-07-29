
import { isProductionEnv } from '@/common/utils/common'
import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { infoSlice } from './slices'

const makeStore = () => configureStore({
  reducer: {
    [infoSlice.name]: infoSlice.reducer
  },
  devTools: !isProductionEnv
})

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>

// next-redux-wrapper
export const wrapper = createWrapper<AppStore>(makeStore)
