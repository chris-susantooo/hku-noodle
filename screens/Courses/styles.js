import styled from 'styled-components/native'
import {
  SearchBar as NativeSearchBar,
  ListItem,
  Badge
} from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'

export const SearchBar = styled(NativeSearchBar).attrs({
  inputContainerStyle: { paddingHorizontal: 5 },
  inputStyle: { fontFamily: 'Medium' },
  cancelButtonProps: {
    buttonTextStyle: { color: 'black', fontFamily: 'Medium' }
  }
})``

export const CourseList = styled.FlatList`
  width: 100%;
  display: flex;
  flex-grow: 1;
`

export const CourseItem = styled(ListItem).attrs({
  Component: TouchableScale,
  friction: 90,
  tension: 100,
  activeScale: 0.95,
  containerStyle: {
    borderRadius: 9,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.04,
    elevation: 5
  }
})`
  margin: 12px 10px;
`

export const CourseItemContent = styled(ListItem.Content)`
  padding: 10px 0;
`

export const CourseItemTitle = styled(ListItem.Title)`
  font-family: 'Medium';
  font-size: 18px;
  color: black;
`

export const CourseItemSubtitle = styled(ListItem.Subtitle)`
  margin-top: 5px;
  font-family: 'Regular';
  font-size: 14px;
  color: gray;
`

export const CourseBadge = styled(Badge).attrs(({ semester, year }) => {
  let status = 'warning'
  if (semester === 1) status = 'success'
  if (semester === 2) status = 'primary'

  return {
    status,
    value: semester
      ? `${year} S${semester}`
      : `${year}/${(year + 1).toString().slice(-2)}`,
    containerStyle: {
      position: 'absolute',
      bottom: 0,
      right: 0
    },
    badgeStyle: {
      paddingHorizontal: 2
    }
  }
})``
