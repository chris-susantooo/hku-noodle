import styled from 'styled-components/native'
import { Badge, Button, ListItem } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'

import WelcomeIllustration from '../../assets/tour/welcome.png'
import AboutNoodleIllustration from '../../assets/tour/about-noodle.png'

export const BottomNavigation = styled.View`
  align-self: flex-end;
  justify-content: space-evenly;
  width: 100%;
  height: 15%;
`

export const PageDots = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;

  flex: 1;
`

export const PageDot = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: black;
  margin: 5px;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
`

export const BottomButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const BottomButton = styled(Button).attrs({
  type: 'clear',
  containerStyle: {
    paddingHorizontal: 30,
    paddingVertical: 5
  },
  titleStyle: {
    color: 'black',
    fontFamily: 'Medium'
  }
})``

export const Header = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: 20%;
  padding: 0 10%;
`

export const WelcomeImage = styled.Image.attrs({ source: WelcomeIllustration })`
  width: 100%;
  height: 70%;
`

export const AboutNoodleImage = styled.Image.attrs({
  source: AboutNoodleIllustration
})`
  width: 100%;
  height: 70%;
`

export const CourseList = styled.FlatList`
  width: 100%;
`

export const CourseItem = styled(ListItem).attrs(({ selected }) => ({
  Component: TouchableScale,
  friction: 90,
  tension: 100,
  activeScale: 0.95,
  containerStyle: {
    backgroundColor: selected ? 'white' : 'black',
    borderRadius: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 5
  }
}))`
  margin: 12px 10px;
`

export const CourseItemContent = styled(ListItem.Content)``

export const CourseItemTitle = styled(ListItem.Title)`
  font-family: 'Medium';
  font-size: 18px;
  color: ${({ selected }) => (selected ? 'black' : 'white')};
`

export const CourseItemSubtitle = styled(ListItem.Subtitle)`
  margin-top: 5px;
  font-family: 'Regular';
  font-size: 14px;
  color: gray;
`

export const CourseBadge = styled(Badge).attrs(
  ({ semester, year, selected }) => {
    let status = 'warning'
    if (semester === 1) status = 'success'
    if (semester === 2) status = 'primary'
    if (!selected) status = 'error'

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
        borderColor: selected ? 'white' : 'black',
        paddingHorizontal: 2
      },
      textStyle: {
        color: selected ? 'white' : 'black',
        textDecorationLine: selected ? 'none' : 'line-through'
      }
    }
  }
)``
