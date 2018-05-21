import service from '../services/github'

const authSuccess = (user: any) => ({
  type: 'AUTH_SUCCESS',
  payload: {
    user
  }
})

const authFail = (error: any) => ({
  type: 'AUTH_FAIL',
  payload: {
    error
  }
})

export default function (user: string) {
  return (dispatch: any) => {
    service
      .userInfo(user)
      .then((response: any) => response.json())
      .then((response: any) => (dispatch(authSuccess(response))))
      .catch((err: any) => dispatch(authFail(err)))
  }
}
