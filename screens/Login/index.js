import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import Icon from 'react-native-vector-icons/FontAwesome'
import { func, shape } from 'prop-types'

import { localAuthRequest, loginUserRequest } from '../../store/auth/actions'
import { getUser, getIsLoggedIn } from '../../store/auth/selectors'
import { getHasNewCourse } from '../../store/course/selectors'
import { getShowTour } from '../../store/config/selectors'
import { createLoadingSelector } from '../../store/loading'
import { createMessageSelector, dismissMessage } from '../../store/message'

import Heading from '../../components/Heading'
import Input from '../../components/Input'
import SafeView from '../../components/SafeView'
import { LoginForm, LoginButton } from './styles'

const Login = ({ navigation }) => {
  const user = useSelector(getUser)

  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn)
  const isLoggingIn = useSelector(createLoadingSelector('LOGIN_USER'))
  const loginError = useSelector(createMessageSelector('LOGIN_USER_FAILURE'))
  const showTour = useSelector(getShowTour)
  const hasNewCourse = useSelector(getHasNewCourse)

  useEffect(() => {
    if (username) {
      dispatch(localAuthRequest())
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      navigation.replace(showTour || hasNewCourse ? 'Tour' : 'Loading')
    }
  }, [isLoggedIn, hasNewCourse])

  const validateUsername = () => {
    if (username.length <= 3) {
      setUsernameError('Username must be longer than 3 characters')
      return false
    }
    dispatch(dismissMessage('LOGIN_USER_FAILURE'))
    setUsernameError('')
    return true
  }

  const validatePassword = () => {
    if (!/^(?=.*\d)(?=.*[a-zA-Z]).{10,18}$/.test(password)) {
      setPasswordError('Password must be 10-18 alphanumeric characters')
      return false
    }
    setPasswordError('')
    return true
  }

  const onLoginPressed = () => {
    const usernameIsValid = validateUsername()
    const passwordIsValid = validatePassword()
    if (usernameIsValid && passwordIsValid) {
      dispatch(loginUserRequest({ username, password }))
    }
  }

  return (
    <SafeView dismissKeyboard>
      <StatusBar style="dark-content" animated />
      <Heading>Login to HKU Moodle</Heading>
      <LoginForm>
        <Input
          value={username}
          onChangeText={setUsername}
          onBlur={validateUsername}
          placeholder="Username"
          leftIcon={<Icon name="user" size={20} color="grey" />}
          autoCapitalize="none"
          errorMessage={usernameError}
        />
        <Input
          value={password}
          onChangeText={setPassword}
          onBlur={validatePassword}
          errorMessage={passwordError || loginError}
          secureTextEntry={!showPassword}
          placeholder="Password"
          leftIcon={<Icon name="lock" size={20} color="grey" />}
          rightIcon={
            <Icon
              name={showPassword ? 'eye-slash' : 'eye'}
              size={20}
              color="grey"
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <LoginButton
          title="Login"
          onPress={onLoginPressed}
          loading={isLoggingIn}
        />
      </LoginForm>
    </SafeView>
  )
}

Login.propTypes = {
  navigation: shape({ replace: func.isRequired }).isRequired
}

export default Login
