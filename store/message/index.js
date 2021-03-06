import { createAction, createReducer } from '@reduxjs/toolkit'
import { loginUserFailure, logoutUserSuccess } from '../auth/actions'

export const dismissMessage = createAction('DISMISS_MESSAGE')

export default createReducer({}, builder =>
  builder
    .addCase(loginUserFailure, (state, { payload }) => {
      state[loginUserFailure] = payload.error
    })
    .addCase(dismissMessage, (state, { payload }) => {
      if (state[payload]) delete state[payload]
    })
    .addCase(logoutUserSuccess, () => {})
)

export const createMessageSelector = action => state => {
  return state.message?.[action] ?? ''
}
