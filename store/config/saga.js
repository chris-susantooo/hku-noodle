import { takeLatest, put } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { initAppRequest, initAppSuccess, initAppFailure } from './actions'

function* onInitApp() {
  try {
    const [showTour, username] = yield Promise.all([
      AsyncStorage.getItem('showTour'),
      SecureStore.getItemAsync('username')
    ])
    yield put(initAppSuccess({ username, showTour }))
  } catch (e) {
    yield put(initAppFailure({ username: '', showTour: false }))
  }
}

export default function* configSaga() {
  yield takeLatest(initAppRequest.toString(), onInitApp)
}
