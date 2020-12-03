import axios from 'axios'
import qs from 'qs'
import { parse } from 'node-html-parser'

const loginUser = async (username, password, { portal } = {}) => {
  const { data } = await axios.post(
    'https://hkuportal.hku.hk/cas/servlet/edu.yale.its.tp.cas.servlet.Login',
    qs.stringify({
      ...(!portal && {
        service: 'https://moodle.hku.hk/login/index.php?authCAS=CAS'
      }),
      username,
      password
    }),
    { responseType: 'text' }
  )

  const nextUrl = data.split('"').find(s => s.startsWith('https://'))

  const { data: nextData } = await axios.get(nextUrl)

  const root = parse(nextData)
  const token = extractToken(root)
  const courses = extractCourses(root)
  const { text: fullname } = root.querySelector('.usertext')

  return { token, courses, fullname }
}

const extractToken = dom => {
  const { text } = dom.querySelector('script[type=text/javascript]')
  return text.split('"sesskey":"')[1].split('"')[0]
}

const extractCourses = dom => {
  const rawCourses = dom.querySelectorAll('.coursebox')
  return rawCourses.reduce((courses, rawCourse) => {
    const { text } = rawCourse
    const id = text.split(' ')[0]
    const [name, section] = text.split(']')[0].split('[')
    const year = parseInt(section.slice(-4), 10)
    const semester = extractSemester(section)
    const teachers = extractTeachers(rawCourse.querySelectorAll('.teachers a'))
    const url = rawCourse
      .querySelector('.coursename')
      .firstChild.getAttribute('href')
    courses[id] = { id, name: name.trim(), year, semester, teachers, url }
    return courses
  }, {})
}

const extractSemester = section => {
  if (section.startsWith('Section ')) {
    if (section[8] === '1') return 1
    if (section[8] === '2') return 2
  }
  return 0
}

const extractTeachers = teacherElements => {
  return teacherElements.map(te => ({
    name: te.text,
    url: te.getAttribute('href')
  }))
}

export default loginUser
