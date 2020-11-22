import { createReducer } from '@reduxjs/toolkit'
import { loginUserSuccess } from './actions'
import { initAppFailure, initAppSuccess } from '../config/actions'

export const initialState = {
  user: {
    username: ''
  },
  token: ''
}

export default createReducer(initialState, builder =>
  builder
    .addCase(initAppSuccess, (state, { payload }) => {
      state.user.username = payload.username
    })
    .addCase(initAppFailure, (state, { payload }) => {
      state.user.username = payload.username
    })
    .addCase(loginUserSuccess, (state, { payload }) => {
      state.user.username = payload.username
      state.token = payload.token
    })
    .addDefaultCase(() => {})
)
