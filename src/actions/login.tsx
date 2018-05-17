import { LOGIN, LOGOUT } from '../types/login'
export const login = (message: any) => {
  return (dispatch: any) => {
    dispatch({
       type: LOGIN,
       payload: {
          user: {
            name: 'Lex Martinez',
            email: 'lex0316@gmail.com'
          }
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