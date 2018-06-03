import i18n from '../config/i18n'

const initialState = {
  lang: i18n.language,
  error: false,
  loading: false
}

export default (state = initialState , action: any) => {
  switch (action.type) {
    case 'SET_LANG':
    case 'SET_LOADING':
    case 'SET_ERROR':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
