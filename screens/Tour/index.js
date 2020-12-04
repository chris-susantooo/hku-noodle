import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import { bool, func, shape } from 'prop-types'

import { View } from 'react-native'
import SafeView from '../../components/SafeView'

import Slider from './Slider'
import WelcomePage from './Welcome'
import AboutNoodlePage from './AboutNoodle'
import SelectCoursesPage from './SelectCourses'

import {
  BottomNavigation,
  PageDots,
  PageDot,
  BottomButtons,
  BottomButton
} from './styles'

import { getHasNewCourse } from '../../store/course/selectors'
import { saveCurrentCourses } from '../../store/course/actions'

const pages = [WelcomePage, AboutNoodlePage, SelectCoursesPage]

const Tour = ({ navigation, route }) => {
  const [page, setPage] = useState(0)
  const dispatch = useDispatch()
  const slider = useRef(null)

  const hasNewCourse = useSelector(getHasNewCourse)

  useEffect(() => {
    if ((hasNewCourse || route.params?.edit) && slider.current) {
      setTimeout(() => slider.current.goTo(pages.length - 1), 200)
    }
  }, [route])

  const onFinish = () => {
    dispatch(saveCurrentCourses())
    navigation.replace('Courses')
  }

  return (
    <SafeView noPadding>
      <StatusBar style="dark-content" animated />
      <Slider page={page} pages={pages} pageChange={setPage} ref={slider} />
      <BottomNavigation>
        <PageDots>
          {pages.map((_, index) => (
            <PageDot
              key={index} // eslint-disable-line react/no-array-index-key
              active={index === page}
            />
          ))}
        </PageDots>
        <BottomButtons>
          {page === pages.length - 1 ? (
            <>
              <View />
              <BottomButton title="Finish" onPress={onFinish} />
            </>
          ) : (
            <>
              <BottomButton
                title="Skip"
                onPress={() => slider.current.goTo(pages.length - 1)}
              />
              <BottomButton
                title="Next"
                onPress={() => slider.current.goTo(page + 1)}
              />
            </>
          )}
        </BottomButtons>
      </BottomNavigation>
    </SafeView>
  )
}

Tour.propTypes = {
  navigation: shape({ replace: func.isRequired }).isRequired,
  route: shape({ params: shape({ edit: bool }) }).isRequired
}

export default Tour
