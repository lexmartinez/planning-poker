const trigger = (type: string, payload: any) => ({
  type, payload
})

export const setLanguage = (lang: string) => {
  return (dispatch: any) => {
    dispatch(trigger('SET_LANG', { lang }))
  }
}

export const setLoading = (loading: boolean) => {
  return (dispatch: any) => {
    dispatch(trigger('SET_LOADING', { loading }))
  }
}

export const setError = (isError: boolean) => {
  return (dispatch: any) => {
    dispatch(trigger('SET_ERROR', { error: isError }))
  }
}
