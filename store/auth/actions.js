import { createAction } from '@reduxjs/toolkit'

export const localAuthRequest = createAction('LOCAL_AUTH_REQUEST')
export const localAuthSuccess = createAction('LOCAL_AUTH_SUCCESS')
export const localAuthFailure = createAction('LOCAL_AUTH_FAILURE')

export const loginUserRequest = createAction('LOGIN_USER_REQUEST')
export const loginUserSuccess = createAction('LOGIN_USER_SUCCESS')
export const loginUserFailure = createAction('LOGIN_USER_FAILURE')

export const logoutUserRequest = createAction('LOGOUT_USER_REQUEST')
export const logoutUserSuccess = createAction('LOGOUT_USER_SUCCESS')
