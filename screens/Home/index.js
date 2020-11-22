import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

import { StyleSheet, Text, Image } from 'react-native'
import LoginIllustration from '../../assets/login/bg.png'

const Home = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar style="dark-content" animated />
    <Image source={LoginIllustration} style={{ width: '100%', height: 300 }} />
    <Text>Login with your HKU Portal username and password.</Text>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Home
