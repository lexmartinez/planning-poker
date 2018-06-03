
const initialState = {
  isAuthenticated: false
}

export default (state = initialState , action: any) => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload
      }
    case 'AUTH_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        ...action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: undefined
      }
    default:
      return state
  }
}
