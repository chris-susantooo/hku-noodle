import { all, call, select, takeEvery } from 'redux-saga/effects'
import { fetchCourseUpdatesRequest } from './actions'
import { getCurrentCourses } from './selectors'
import fetchCourse from '../../api/fetchCourse'

function* onFetchCourseUpdates() {
  const currentCourses = yield select(getCurrentCourses)

  const fetchEffects = currentCourses.map(({ url }) => call(fetchCourse, url))
  const results = yield all(fetchEffects)
  // eslint-disable-next-line no-console
  console.log(results)
}

export default function* courseSaga() {
  yield takeEvery(fetchCourseUpdatesRequest.toString(), onFetchCourseUpdates)
}
