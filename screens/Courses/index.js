import React, { useEffect, useMemo, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { shape, func } from 'prop-types'
import Fuse from 'fuse.js'

import Tour from '../Tour'
import { getCoursesArr } from '../../store/course/selectors'
import { logoutUserRequest } from '../../store/auth/actions'

import SafeView from '../../components/SafeView'
import Heading from '../../components/Heading'

import {
  SearchBar,
  CourseList,
  CourseItem,
  CourseItemTitle,
  CourseItemSubtitle,
  CourseItemContent,
  CourseBadge
} from './styles'
import { getIsLoggedIn } from '../../store/auth/selectors'

const searchOptions = {
  keys: ['name', 'year', 'teachers.name', 'id', 'semester']
}

const { Navigator, Screen } = createDrawerNavigator()

const CoursesPage = ({ navigation }) => {
  const [search, setSearch] = useState('')
  const courses = useSelector(getCoursesArr, shallowEqual)

  const filteredCourses = useMemo(() => {
    if (!search) return courses

    const fuse = new Fuse(courses, searchOptions)
    return fuse.search(search).map(result => result.item)
  }, [courses, search])

  const renderCourse = ({ item: course }) => {
    const teacher =
      course.teachers.length === 1
        ? course.teachers[0].name
        : `${course.teachers[0].name} and ${course.teachers.length - 1} others`

    return (
      <CourseItem
        onPress={() => navigation.push('Course', { url: course.url })}
      >
        <CourseItemContent>
          <CourseBadge semester={course.semester} year={course.year} />
          <CourseItemTitle>{course.name}</CourseItemTitle>
          <CourseItemSubtitle>{teacher}</CourseItemSubtitle>
        </CourseItemContent>
      </CourseItem>
    )
  }

  return (
    <SafeView dismissKeyboard>
      <StatusBar style="dark-content" animated />
      <SearchBar
        placeholder="Search from courses..."
        onChangeText={setSearch}
        value={search}
        platform={Platform.OS}
      />
      <Heading style={{ alignSelf: 'flex-start', paddingHorizontal: 10 }}>
        Your Courses
      </Heading>
      <CourseList
        data={filteredCourses}
        renderItem={renderCourse}
        keyExtractor={course => course.id}
      />
    </SafeView>
  )
}

const Logout = ({ navigation }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn)
  useEffect(() => {
    dispatch(logoutUserRequest())
  }, [dispatch, logoutUserRequest])
  useEffect(() => {
    if (!isLoggedIn) {
      navigation.replace('Login')
    }
  }, [isLoggedIn, navigation])

  return null
}

const Courses = () => {
  return (
    <Navigator initialRouteName="Home">
      <Screen name="Home" component={CoursesPage} />
      <Screen
        name="Edit Current Courses"
        component={Tour}
        initialParams={{ edit: true }}
      />
      <Screen name="Logout" component={Logout} />
    </Navigator>
  )
}

CoursesPage.propTypes = {
  navigation: shape({ push: func.isRequired }).isRequired
}
Logout.propTypes = {
  navigation: shape({ replace: func.isRequired }).isRequired
}

export default Courses
