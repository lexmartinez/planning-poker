
import types from '../actions/types'

const initialState = {
  isAuthenticated: false
}

export default (state = initialState , action: any) => {
  switch (action.type) {
    case types.auth.AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload
      }
    case types.auth.AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        ...action.payload
      }
    case types.auth.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: undefined
      }
    default:
      return state
  }
}
