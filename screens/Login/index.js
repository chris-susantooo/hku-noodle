import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { localAuthRequest, loginUserRequest } from '../../store/auth/actions'
import { getUser } from '../../store/auth/selectors'
import { createLoadingSelector } from '../../store/loading'

import Heading from '../../components/Heading'
import Input from '../../components/Input'
import DismissKeyboard from '../../components/DismissKeyboard'
import { LoginForm, LoginButton } from './styles'

const Login = () => {
  const user = useSelector(getUser)
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const dispatch = useDispatch()
  const isLoggingIn = useSelector(createLoadingSelector('LOGIN_USER'))

  useEffect(() => {
    if (username) {
      dispatch(localAuthRequest())
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const validateUsername = () => {
    if (username.length <= 3) {
      setUsernameError('Username must be longer than 3 characters')
      return false
    }
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
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
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
            errorMessage={passwordError}
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
      </SafeAreaView>
    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  }
})

export default Login
