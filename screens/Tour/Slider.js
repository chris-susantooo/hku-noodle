import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { ScrollView, useWindowDimensions } from 'react-native'
import { arrayOf, func, number } from 'prop-types'

const Slider = forwardRef(({ pageChange, pages, page }, ref) => {
  const { width } = useWindowDimensions()
  const scrollView = useRef(null)

  useImperativeHandle(ref, () => ({
    goTo: nextPage => {
      if (nextPage !== page && nextPage >= 0 && nextPage < pages.length) {
        scrollView.current.scrollTo({ x: nextPage * width })
      }
    }
  }))

  const handleOnScroll = e => {
    const { x } = e.nativeEvent.contentOffset
    const nextPage = Math.round(x / width)
    if (nextPage !== page && nextPage >= 0 && nextPage < pages.length) {
      pageChange(nextPage)
    }
  }

  return (
    <ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={32}
      showsHorizontalScrollIndicator={false}
      onScroll={handleOnScroll}
      ref={scrollView}
    >
      {pages.map((Page, index) => (
        <Page key={index} width={width} /> // eslint-disable-line react/no-array-index-key
      ))}
    </ScrollView>
  )
})

Slider.defaultProps = {
  pageChange: () => {},
  pages: [],
  page: 0
}

Slider.propTypes = {
  pageChange: func,
  pages: arrayOf(func),
  page: number
}

export default Slider
