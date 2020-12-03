import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { spawn } from 'redux-saga/effects'

import authReducer from './auth'
import configReducer from './config'
import loadingReducer from './loading'
import messageReducer from './message'
import courseReducer from './course'

import authSaga from './auth/saga'
import configSaga from './config/saga'
import courseSaga from './course/saga'

import { initAppRequest } from './config/actions'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    auth: authReducer,
    config: configReducer,
    loading: loadingReducer,
    message: messageReducer,
    course: courseReducer
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
})

function* rootSaga() {
  yield spawn(authSaga)
  yield spawn(configSaga)
  yield spawn(courseSaga)
}

sagaMiddleware.run(rootSaga)
store.dispatch(initAppRequest())

export default store
