import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '../store'

export interface TInfoState {
  now: number
}

const initialState: TInfoState = {
  now: Date.now()
}

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    updateNow(state) {
      state.now = Date.now()
    }
  },
  // TODO(haoln): Handle warning to use builder
  extraReducers: {
    // next-redux-wrapper
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.info,
      }
    },
  },
})

export const IInfoSlice = {
  actions: infoSlice.actions,
  selectors: {
    selectNow: (state: AppState) => state.info.now,
  },

}
