import React from 'react'
import { Text } from 'react-native'
import { node } from 'prop-types'

const Heading = ({ children }) => (
  <Text style={{ fontFamily: 'Bold', fontSize: 28, marginVertical: 10 }}>
    {children}
  </Text>
)

Heading.propTypes = {
  children: node.isRequired
}

export default Heading
