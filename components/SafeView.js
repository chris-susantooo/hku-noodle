import { bool, node, shape } from 'prop-types'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import DismissKeyboard from './DismissKeyboard'

const SafeView = ({ children, dismissKeyboard, noPadding, style }) => {
  const finalStyle = {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: noPadding ? 0 : 10,
    ...style
  }
  return dismissKeyboard ? (
    <DismissKeyboard>
      <SafeAreaView style={finalStyle}>{children}</SafeAreaView>
    </DismissKeyboard>
  ) : (
    <SafeAreaView style={finalStyle}>{children}</SafeAreaView>
  )
}
SafeView.defaultProps = {
  dismissKeyboard: false,
  noPadding: false,
  style: {}
}

SafeView.propTypes = {
  children: node.isRequired,
  dismissKeyboard: bool,
  noPadding: bool,
  style: shape({})
}

export default SafeView
