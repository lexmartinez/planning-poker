import * as React from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { setLanguage, setLoading, setError } from '../../actions/global'
import Login from './view'

const mapStateToProps = (state: any) => {
  return ({
    ...state.auth,
    ...state.global
  })
}

const mapDispatchToProps = (dispatch: any) => ({
  userInfo: (authToken: string, provider: string) => {
    dispatch(login(authToken, provider))
    dispatch(setLoading(false))
  },
  setLanguage: (lang: string) => {
    dispatch(setLanguage(lang))
  },
  setError: (isError: boolean) => {
    dispatch(setError(isError))
  },
  setLoading: (loading: boolean) => {
    dispatch(setLoading(loading))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
