import i18n from '../config/i18n'

const initialState = {
  lang: i18n.language
}

export default (state = initialState , action: any) => {
  switch (action.type) {
    case 'SET_LANG':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
