import { createReducer } from '@reduxjs/toolkit'
import { loginUserSuccess, logoutUserSuccess } from '../auth/actions'
import { initAppSuccess } from '../config/actions'
import { toggleCurrentCourse } from './actions'

const initState = {
  courses: {},
  current: [],
  hiddenCurrent: [],
  hasNewCourse: false
}

export default createReducer(initState, builder =>
  builder
    .addCase(initAppSuccess, (state, { payload }) => {
      state.current = payload.userSettings?.currentCourseIds || []
      state.hiddenCurrent = payload.userSettings?.hiddenCourseIds || []
    })
    .addCase(loginUserSuccess, (state, { payload }) => {
      const { courses, currentCourseIds, hasNewCourse } = payload
      state.courses = courses
      state.current = currentCourseIds

      if (hasNewCourse) {
        state.hasNewCourse = true
        state.hiddenCurrent = []
      }
    })
    .addCase(toggleCurrentCourse, (state, { payload }) => {
      const courseAlreadyDeselected = state.hiddenCurrent.some(
        courseId => courseId === payload.courseId
      )
      if (courseAlreadyDeselected) {
        state.hiddenCurrent.splice(
          state.hiddenCurrent.indexOf(payload.courseId),
          1
        )
      } else {
        state.hiddenCurrent.push(payload.courseId)
      }
    })
    .addCase(logoutUserSuccess, () => initState)
    .addDefaultCase(() => {})
)
