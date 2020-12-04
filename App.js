/* eslint-disable global-require */
import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'

import store from './store'
import Login from './screens/Login'
import CourseViewer from './screens/Course'
import Tour from './screens/Tour'
import Courses from './screens/Courses'

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
          <Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              headerTintColor: 'black',
              headerLeftContainerStyle: { marginLeft: 5 },
              headerBackTitleStyle: {
                color: 'black',
                marginLeft: 5,
                fontFamily: 'Medium'
              }
            }}
          >
            <Screen name="Login" component={Login} />
            <Screen name="Tour" component={Tour} />
            <Screen
              name="Course"
              component={CourseViewer}
              options={{ headerShown: true, headerTitle: '' }}
            />
            <Screen name="Courses" component={Courses} />
          </Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
