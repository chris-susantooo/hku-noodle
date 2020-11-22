/* eslint-disable global-require */
import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'

import store from './store'
import Login from './screens/Login'
import Home from './screens/Home'

const { Navigator, Screen } = createStackNavigator()

const App = () => {
  const [fontsReady] = useFonts({
    Bold: require('./assets/fonts/bold.otf'),
    Medium: require('./assets/fonts/medium.otf'),
    Regular: require('./assets/fonts/regular.otf')
  })
  if (!fontsReady) return null

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Navigator>
            <Screen
              name="Login"
              component={Login}
              options={{ header: () => null }}
            />
            <Screen name="Home" component={Home} />
          </Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
