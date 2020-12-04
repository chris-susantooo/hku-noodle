import { shape } from 'prop-types'
import React from 'react'
import { View } from 'react-native'

import { StatusBar } from 'expo-status-bar'
import { WebView } from 'react-native-webview'

const Course = ({ route }) => (
  <View style={{ flex: 1 }}>
    <StatusBar style="dark-content" animated />
    <WebView
      sharedCookiesEnabled
      originWhitelist={['*']}
      source={{ uri: route.params.url }}
    />
  </View>
)

Course.propTypes = {
  route: shape({}).isRequired
}

export default Course
