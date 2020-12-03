import { createAction } from '@reduxjs/toolkit'

export const fetchCourseUpdatesRequest = createAction(
  'FETCH_COURSE_UPDATES_REQUEST'
)
export const toggleCurrentCourse = createAction('TOGGLE_CURRENT_COURSE')
export const saveCurrentCourses = createAction('SAVE_CURRENT_COURSES')
