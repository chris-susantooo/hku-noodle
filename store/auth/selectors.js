export const getUser = state => state.auth.user
export const getToken = state => state.auth.token
export const getIsLoggedIn = state =>
  !!(state.auth.user.username && state.auth.token)
