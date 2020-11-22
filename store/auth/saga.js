import { put, select, takeLeading, takeLatest, call } from 'redux-saga/effects'
import * as LA from 'expo-local-authentication'
import * as SecureStore from 'expo-secure-store'
import {
  localAuthRequest,
  localAuthSuccess,
  localAuthFailure,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure
} from './actions'
import { getUser } from './selectors'
import loginUser from '../../api/login'

function* onLocalAuthRequest() {
  const hasBioHardware = yield LA.hasHardwareAsync()
  if (!hasBioHardware) {
    yield put(localAuthFailure())
    return
  }

  const hasBioEnrolled = yield LA.isEnrolledAsync()
  if (!hasBioEnrolled) {
    yield put(localAuthFailure())
    return
  }

  const { success, error, warning } = yield LA.authenticateAsync({
    promptMessage: 'Login HKU Moodle with Noodle'
  })

  if (success) {
    yield put(localAuthSuccess({ warning }))
  } else {
    yield put(localAuthFailure({ error, warning }))
  }
}

function* onLocalAuthSuccess() {
  const { username } = yield select(getUser)
  const password = yield SecureStore.getItemAsync('password')
  yield put(loginUserRequest({ username, password }))
}

function* onLoginRequest({ payload: { username, password } }) {
  try {
    const { nextUrl, token } = yield call(loginUser, username, password)
    const secureStoreUsable = yield SecureStore.isAvailableAsync()
    if (secureStoreUsable) {
      yield Promise.all([
        SecureStore.setItemAsync('username', username),
        SecureStore.setItemAsync('password', password)
      ])
    }
    yield put(loginUserSuccess({ nextUrl, token, username }))
  } catch (e) {
    yield put(loginUserFailure({ error: e }))
  }
}

export default function* authSaga() {
  yield takeLeading(localAuthRequest.toString(), onLocalAuthRequest)
  yield takeLeading(localAuthSuccess.toString(), onLocalAuthSuccess)
  yield takeLatest(loginUserRequest.toString(), onLoginRequest)
}
