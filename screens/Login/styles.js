import styled from 'styled-components/native'
import { Button } from 'react-native-elements'

export const LoginForm = styled.View`
  display: flex;
  width: 85%;
  margin-top: 15px;
`

export const LoginButton = styled(Button).attrs({
  containerStyle: {
    paddingHorizontal: 8
  },
  buttonStyle: {
    marginTop: 15,
    paddingVertical: 10,
    borderRadius: 9,
    backgroundColor: 'black'
  },
  titleStyle: {
    fontFamily: 'Medium'
  }
})``
