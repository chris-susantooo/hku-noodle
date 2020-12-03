import axios from 'axios'
// import { parse } from 'node-html-parser'

const fetchCourse = async url => {
  await axios.get(url)
  // console.log(data.data)
}

export default fetchCourse
