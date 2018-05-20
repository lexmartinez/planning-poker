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

const service = {
  authenticate: (user: string) => {
    return fetch(`https://api.github.com/users/${user}`)
  }
}

export default function (user: string) {
  return (dispatch: any) => {
    service
      .authenticate(user)
      .then((response: any) => response.json())
      .then((response: any) => (dispatch(authSuccess(response))))
      .catch((err: any) => dispatch(authFail(err)))
  }
}
