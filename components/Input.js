import { Input } from 'react-native-elements'
import styled from 'styled-components/native'

const StyledInput = styled(Input).attrs({
  errorStyle: { color: 'red', fontFamily: 'Regular', marginHorizontal: 0 }
})`
  font: 16px Regular;
  margin: 0;
  padding-left: 5px;
  padding-right: 5px;
`

export default StyledInput
