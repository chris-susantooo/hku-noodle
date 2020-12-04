import axios from 'axios'

const logoutUser = async session =>
  axios.get(`https://moodle.hku.hk/login/logout.php?sesskey=${session}`)

export default logoutUser
