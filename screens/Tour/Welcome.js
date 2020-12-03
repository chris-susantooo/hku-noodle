import React from 'react'
import { useSelector } from 'react-redux'
import { number } from 'prop-types'

import SafeView from '../../components/SafeView'
import Heading from '../../components/Heading'

import { Header, WelcomeImage } from './styles'
import { getUser } from '../../store/auth/selectors'

const WelcomePage = ({ width }) => {
  const { fullname } = useSelector(getUser)

  return (
    <SafeView noPadding style={{ width, justifyContent: 'space-evenly' }}>
      <Header>
        <Heading compact>Welcome 🎉</Heading>
        <Heading compact>{fullname}!</Heading>
      </Header>
      <WelcomeImage />
    </SafeView>
  )
}

WelcomePage.propTypes = {
  width: number.isRequired
}

export default WelcomePage
