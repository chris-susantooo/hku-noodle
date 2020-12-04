import { takeEvery, takeLatest, put, select } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'

import {
  initAppRequest,
  initAppSuccess,
  initAppFailure,
  setShowTour
} from './actions'
import { saveCurrentCourses } from '../course/actions'
import { getUser } from '../auth/selectors'

function* onInitApp({ payload: existingUsername } = {}) {
  try {
    const username =
      existingUsername || (yield SecureStore.getItemAsync('username'))

    if (!username) {
      yield put(initAppSuccess({}))
      return
    }

    const userSettingsRaw = yield AsyncStorage.getItem(username)
    const userSettings = (yield JSON.parse(userSettingsRaw)) || { show: true }

    yield put(initAppSuccess({ username, userSettings }))
  } catch (e) {
    yield put(initAppFailure())
  }
}

function* onSaveCurrentCourses() {
  const { current, hiddenCurrent } = yield select(state => state.course)
  const { username } = yield select(getUser)
  const userSettingsRaw = yield AsyncStorage.getItem(username)
  const userSettings = yield JSON.parse(userSettingsRaw)
  yield AsyncStorage.setItem(
    username,
    JSON.stringify({
      ...userSettings,
      showTour: false,
      currentCourseIds: current,
      hiddenCourseIds: hiddenCurrent
    })
  )
  yield put(setShowTour({ show: false }))
}

export default function* configSaga() {
  yield takeLatest(initAppRequest.toString(), onInitApp)
  yield takeEvery(saveCurrentCourses.toString(), onSaveCurrentCourses)
}
