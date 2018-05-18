import { LOGIN, LOGIN_OK, LOGIN_FAIL, LOGOUT, LOGOUT_FAIL, LOGOUT_OK } from '../types/login'

const service = {
  authenticate: (user: string, password: string) => {
    return new Promise((resolve: any, reject: any) => {
      resolve({
        name: 'Lex Martinez',
        email: 'lex0316@gmail.com'
      })
    })
  }
}
export const login = () => {
  return (dispatch: any) => {
    dispatch({
       type: LOGIN,
       payload: {}
    })
  }
}
export const loginOk = (user: any) => {
  return (dispatch: any) => {
    dispatch({
       type: LOGIN_OK,
       payload: {
          user,
          error: undefined,
          isLoggedIn: true
       }
    })
  }
}

export const loginFail = (error: any) => {
  return (dispatch: any) => {
    dispatch({
       type: LOGIN_FAIL,
       payload: {
          error,
          isLoggedIn: false,
          user: undefined
       }
    })
  }
}

export const logout = () => {
  return (dispatch: any) => {
    dispatch({
       type: LOGOUT,
       payload: {}
    })
  }
}

export const logoutOk = (response: any) => {
  return (dispatch: any) => {
    dispatch({
       type: LOGOUT_OK,
       payload: {
          user: undefined,
          error: undefined,
          isLoggedIn: false
       }
    })
  }
}

export const logoutFail = (error: any) => {
  return (dispatch: any) => {
    dispatch({
       type: LOGOUT_FAIL,
       payload: {
          error,
          isLoggedIn: true
       }
    })
  }
}

export const authenticate = (user: string, password: string) => {
  return (dispatch: any) => {
    dispatch(login())
    return service
      .authenticate(user, password)
      .then((response: any) => response)
      .then((response: any) => dispatch(loginOk(response)))
      .catch((err: any) => dispatch(loginFail(err)))
  }
}