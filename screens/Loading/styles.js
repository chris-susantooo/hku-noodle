import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

// eslint-disable-next-line import/prefer-default-export
export const Spinner = styled(ActivityIndicator).attrs({
  color: 'black',
  size: 'large'
})`
  margin-top: 60px;
`
