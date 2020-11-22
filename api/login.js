import axios from 'axios'
import qs from 'qs'

const loginUser = async (username, password) => {
  const { data, status } = await axios.post(
    'https://hkuportal.hku.hk/cas/servlet/edu.yale.its.tp.cas.servlet.Login',
    qs.stringify({
      service: 'https://moodle.hku.hk/login/index.php?authCAS=CAS',
      username,
      password
    }),
    { responseType: 'text' }
  )
  if (status !== 200) {
    throw new Error('Network Error: Failed to login to HKU Moodle')
  }

  const nextUrl = data.split('"').find(s => s.startsWith('https://'))
  const [, token] = nextUrl.split('&ticket=')

  if (!nextUrl || !token) {
    throw new Error(`Login Error: Failed to extract nextUrl and token: ${data}`)
  }

  return { nextUrl, token }
}

export default loginUser
