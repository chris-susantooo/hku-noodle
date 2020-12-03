import { shape, func } from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { StatusBar } from 'expo-status-bar'

import { fetchCourseUpdatesRequest } from '../../store/course/actions'

import Heading from '../../components/Heading'
import SafeView from '../../components/SafeView'
import { Spinner } from './styles'

// eslint-disable-next-line no-unused-vars
const Loading = ({ navigation }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCourseUpdatesRequest())
  }, [dispatch])

  return (
    <SafeView>
      <StatusBar style="dark-content" animated />
      <Heading>Grabbing course updates</Heading>
      <Spinner />
    </SafeView>
  )
}

Loading.propTypes = {
  navigation: shape({ replace: func.isRequired }).isRequired
}

export default Loading
