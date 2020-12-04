import {
  put,
  select,
  takeLeading,
  takeLatest,
  call,
  take
} from 'redux-saga/effects'
import * as LA from 'expo-local-authentication'
import * as SecureStore from 'expo-secure-store'
import { difference as _difference } from 'lodash-es'
import {
  localAuthRequest,
  localAuthSuccess,
  localAuthFailure,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  logoutUserRequest,
  logoutUserSuccess
} from './actions'
import { getToken, getUser } from './selectors'
import loginUser from '../../api/login'
import { getCurrentCourseIds } from '../course/selectors'
import logoutUser from '../../api/logout'
import {
  initAppFailure,
  initAppRequest,
  initAppSuccess
} from '../config/actions'

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

const getCurrentSemester = date => {
  const year = date.getFullYear()
  const month = date.getMonth()

  if (month < 8) {
    return { year: year - 1, semester: 2 }
  }
  return { year, semester: 1 }
}

function* onLoginRequest({ payload: { username, password } }) {
  try {
    const { courses, token, fullname } = yield call(
      loginUser,
      username,
      password
    )

    yield put(initAppRequest(username))
    yield take([initAppSuccess.toString(), initAppFailure.toString()])

    let currentCourseIds = yield select(getCurrentCourseIds)
    const now = new Date()
    const { year, semester } = getCurrentSemester(now)

    if (!currentCourseIds.length) {
      currentCourseIds = Object.keys(courses).filter(
        k =>
          (courses[k].year === year && courses[k].semester === semester) ||
          (!courses[k].semester && courses[k].year === year)
      )
    }

    const savedCurrentCourseIds = yield select(getCurrentCourseIds)
    const hasNewCourse =
      _difference(savedCurrentCourseIds, currentCourseIds).length > 0

    const secureStoreUsable = yield SecureStore.isAvailableAsync()
    if (secureStoreUsable) {
      yield Promise.all([
        SecureStore.setItemAsync('username', username),
        SecureStore.setItemAsync('password', password)
      ])
    }
    yield put(
      loginUserSuccess({
        courses,
        currentCourseIds,
        token,
        username,
        fullname,
        hasNewCourse
      })
    )
  } catch (e) {
    console.error(e) // eslint-disable-line no-console
    yield put(loginUserFailure({ error: 'Invalid username or password' }))
  }
}

function* onLogoutRequest() {
  const token = yield select(getToken)
  yield Promise.all([
    logoutUser(token),
    SecureStore.deleteItemAsync('username'),
    SecureStore.deleteItemAsync('password')
  ])
  yield put(logoutUserSuccess())
  yield put(initAppRequest())
}

export default function* authSaga() {
  yield takeLeading(localAuthRequest.toString(), onLocalAuthRequest)
  yield takeLeading(localAuthSuccess.toString(), onLocalAuthSuccess)
  yield takeLatest(loginUserRequest.toString(), onLoginRequest)
  yield takeLatest(logoutUserRequest.toString(), onLogoutRequest)
}
