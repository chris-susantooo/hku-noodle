const courseSorter = (a, b) => {
  // sort by year descending, semester ascending, name ascending
  if (a.year === b.year) {
    if (a.semester === b.semester) {
      return a.name - b.name
    }
    return b.semester - a.semester
  }
  return b.year - a.year
}

export const getCourses = state => state.course.courses
export const getCurrentCourseIds = state => state.course.current
export const getHiddenCurrentCourseIds = state => state.course.hiddenCurrent
export const getCoursesArr = state =>
  Object.values(getCourses(state))
    .filter(course => !state.course.hiddenCurrent.includes(course.id))
    .sort(courseSorter)
export const getSuggestedCurrentCourses = state =>
  getCurrentCourseIds(state)
    .map(courseId => state.course.courses[courseId])
    .sort(courseSorter)
export const getCurrentCourses = state =>
  getCurrentCourseIds(state)
    .filter(courseId => !state.course.hiddenCurrent.includes(courseId))
    .map(courseId => state.course.courses[courseId])
    .sort(courseSorter)
export const getHiddenCurrentCourses = state =>
  getHiddenCurrentCourseIds(state)
    .map(courseId => state.course.courses[courseId])
    .sort(courseSorter)
export const getHasNewCourse = state => state.course.hasNewCourse
