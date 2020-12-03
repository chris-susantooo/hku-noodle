import React from 'react'
import { Text } from 'react-native'
import { bool, node, shape } from 'prop-types'

const Heading = ({ children, style, large, compact }) => (
  <Text
    style={{
      fontFamily: 'Bold',
      fontSize: large ? 32 : 28,
      marginVertical: compact ? 0 : 10,
      ...style
    }}
  >
    {children}
  </Text>
)

Heading.defaultProps = {
  style: {},
  large: false,
  compact: false
}

Heading.propTypes = {
  children: node.isRequired,
  style: shape({}),
  large: bool,
  compact: bool
}

export default Heading
