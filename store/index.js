import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { spawn } from 'redux-saga/effects'

import authReducer from './auth'
import configReducer from './config'
import loadingReducer from './loading'

import authSaga from './auth/saga'
import configSaga from './config/saga'

import { initAppRequest } from './config/actions'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    auth: authReducer,
    config: configReducer,
    loading: loadingReducer
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
})

function* rootSaga() {
  yield spawn(authSaga)
  yield spawn(configSaga)
}

sagaMiddleware.run(rootSaga)
store.dispatch(initAppRequest())

export default store
