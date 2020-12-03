import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { number } from 'prop-types'

import SafeView from '../../components/SafeView'
import Heading from '../../components/Heading'
import {
  Header,
  CourseList,
  CourseItem,
  CourseItemContent,
  CourseItemTitle,
  CourseItemSubtitle,
  CourseBadge
} from './styles'

import {
  getSuggestedCurrentCourses,
  getHiddenCurrentCourses
} from '../../store/course/selectors'
import { toggleCurrentCourse } from '../../store/course/actions'

const SelectCoursesPage = ({ width }) => {
  const currentCourses = useSelector(getSuggestedCurrentCourses)
  const hiddenCurrentCourses = useSelector(getHiddenCurrentCourses)
  const dispatch = useDispatch()

  const renderCourse = ({ item: course }) => {
    const selected = hiddenCurrentCourses.every(
      hiddenCourse => course.id !== hiddenCourse.id
    )
    const teacher =
      course.teachers.length === 1
        ? course.teachers[0].name
        : `${course.teachers[0].name} and ${course.teachers.length - 1} others`

    return (
      <CourseItem
        selected={selected}
        onPress={() => dispatch(toggleCurrentCourse({ courseId: course.id }))}
      >
        <CourseItemContent>
          <CourseBadge
            selected={selected}
            semester={course.semester}
            year={course.year}
          />
          <CourseItemTitle selected={selected}>{course.name}</CourseItemTitle>
          <CourseItemSubtitle>{teacher}</CourseItemSubtitle>
        </CourseItemContent>
      </CourseItem>
    )
  }

  return (
    <SafeView style={{ width }}>
      <Header>
        <Heading compact>Are you currently</Heading>
        <Heading compact>taking these courses?</Heading>
      </Header>
      <CourseList
        data={currentCourses}
        renderItem={renderCourse}
        keyExtractor={course => course.id}
      />
    </SafeView>
  )
}

SelectCoursesPage.propTypes = {
  width: number.isRequired
}

export default SelectCoursesPage
