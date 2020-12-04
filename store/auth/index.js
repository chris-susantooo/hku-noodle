import { createReducer } from '@reduxjs/toolkit'
import { loginUserSuccess, logoutUserSuccess } from './actions'
import { initAppFailure, initAppSuccess } from '../config/actions'

export const initialState = {
  user: {
    username: '',
    fullname: ''
  },
  token: ''
}

export default createReducer(initialState, builder =>
  builder
    .addCase(initAppSuccess, (state, { payload }) => {
      state.user.username = payload.username
    })
    .addCase(initAppFailure, state => {
      state.user.username = ''
    })
    .addCase(loginUserSuccess, (state, { payload }) => {
      const { token, username, fullname } = payload
      state.token = token
      state.user.username = username
      state.user.fullname = fullname
    })
    .addCase(logoutUserSuccess, () => initialState)
    .addDefaultCase(() => {})
)
