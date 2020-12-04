export default function loadingReducer(state = {}, { type }) {
  if (type === 'LOGOUT_USER_SUCCESS') return {}

  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)$/.exec(type)
  if (!matches) return state

  const [, requestName, requestState] = matches
  return {
    ...state,
    [requestName]: requestState === 'REQUEST'
  }
}

export const createLoadingSelector = actions => state => {
  const isLoading = action =>
    state.loading && state.loading[action] === undefined
      ? false
      : state.loading[action]

  if (typeof actions === 'string') return isLoading(actions)
  return actions.some(isLoading)
}
