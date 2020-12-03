import React from 'react'

import { number } from 'prop-types'

import SafeView from '../../components/SafeView'
import Heading from '../../components/Heading'

import { Header, AboutNoodleImage } from './styles'

const AboutNoodlePage = ({ width }) => {
  return (
    <SafeView noPadding style={{ width, justifyContent: 'space-evenly' }}>
      <Header>
        <Heading compact>Noodle 🍜</Heading>
        <Heading compact>Your Couses at a Glance.</Heading>
      </Header>
      <AboutNoodleImage />
    </SafeView>
  )
}

AboutNoodlePage.propTypes = {
  width: number.isRequired
}

export default AboutNoodlePage
