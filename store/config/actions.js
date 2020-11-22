import { createAction } from '@reduxjs/toolkit'

export const initAppRequest = createAction('INIT_APP_REQUEST')
export const initAppSuccess = createAction('INIT_APP_SUCCESS')
export const initAppFailure = createAction('INIT_APP_FAILURE')

export const setShowTour = createAction('SET_SHOW_TOUR')
