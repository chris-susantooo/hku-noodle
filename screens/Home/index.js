import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, Image } from 'react-native'

import LoginIllustration from '../../assets/tour/welcome.png'
import SafeView from '../../components/SafeView'

const Home = () => (
  <SafeView>
    <StatusBar style="dark-content" animated />
    <Image source={LoginIllustration} style={{ width: '100%', height: 300 }} />
    <Text>Login with your HKU Portal username and password.</Text>
  </SafeView>
)

export default Home
