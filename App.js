/* eslint-disable global-require */
import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'

import store from './store'
import Login from './screens/Login'
import Loading from './screens/Loading'
import Tour from './screens/Tour'
import Home from './screens/Home'

const { Navigator, Screen } = createStackNavigator()

const App = () => {
  const [fontsReady] = useFonts({
    Bold: require('./assets/fonts/bold.otf'),
    Medium: require('./assets/fonts/medium.otf'),
    Regular: require('./assets/fonts/regular.otf')
  })
  if (!fontsReady) return null

  const showTour = store.getState().config.tour.show

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Navigator
            initialRouteName="Login"
            screenOptions={{ header: () => null }}
          >
            <Screen name="Login" component={Login} />
            {showTour && <Screen name="Tour" component={Tour} />}
            <Screen name="Loading" component={Loading} />
            <Screen name="Home" component={Home} />
          </Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
