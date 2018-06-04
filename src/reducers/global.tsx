import i18n from '../config/i18n'
import types from '../actions/types'

const initialState = {
  lang: i18n.language,
  error: false,
  loading: false,
  session: undefined
}

export default (state = initialState , action: any) => {
  switch (action.type) {
    case types.global.SET_LANG:
    case types.global.SET_LOADING:
    case types.global.SET_ERROR:
    case types.global.SET_SESSION:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
