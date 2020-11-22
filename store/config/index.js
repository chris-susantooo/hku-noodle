import { createReducer } from '@reduxjs/toolkit'
import { initAppFailure, initAppSuccess, setShowTour } from './actions'

const initialState = {
  tour: {
    show: false
  }
}

export default createReducer(initialState, builder =>
  builder
    .addCase(initAppSuccess, (state, { payload }) => {
      state.tour.show = !!payload.showTour
    })
    .addCase(initAppFailure, (state, { payload }) => {
      state.tour.show = !!payload.showTour
    })
    .addCase(setShowTour, (state, { payload }) => {
      state.tour.show = payload.show
    })
    .addDefaultCase(() => {})
)
