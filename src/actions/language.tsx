const setLanguage = (lang: any) => ({
  type: 'SET_LANG',
  payload: {
    lang
  }
})

export default function (lang: string) {
  return (dispatch: any) => {
    dispatch(setLanguage(lang))
  }
}
