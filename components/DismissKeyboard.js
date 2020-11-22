import React from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { node } from 'prop-types'

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

DismissKeyboard.propTypes = {
  children: node.isRequired
}

export default DismissKeyboard
