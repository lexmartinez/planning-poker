import types from './types'

const trigger = (type: string, payload: any) => ({
  type, payload
})

export const setLanguage = (lang: string) => {
  return (dispatch: any) => {
    dispatch(trigger(types.global.SET_LANG, { lang }))
  }
}

export const setLoading = (loading: boolean) => {
  return (dispatch: any) => {
    dispatch(trigger(types.global.SET_LOADING, { loading }))
  }
}

export const setError = (isError: boolean) => {
  return (dispatch: any) => {
    dispatch(trigger(types.global.SET_ERROR, { error: isError }))
  }
}

export const setSession = (session: any) => {
  return (dispatch: any) => {
    dispatch(trigger(types.global.SET_SESSION, { session }))
  }
}
