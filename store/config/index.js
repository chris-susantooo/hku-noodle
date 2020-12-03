import { createReducer } from '@reduxjs/toolkit'
import { initAppFailure, initAppSuccess, setShowTour } from './actions'

const initialState = {
  tour: {
    show: true
  }
}

export default createReducer(initialState, builder =>
  builder
    .addCase(initAppSuccess, (state, { payload }) => {
      state.tour.show = payload.userSettings?.showTour ?? true
    })
    .addCase(initAppFailure, state => {
      state.tour.show = true
    })
    .addCase(setShowTour, (state, { payload }) => {
      state.tour.show = payload.show
    })
    .addDefaultCase(() => {})
)
