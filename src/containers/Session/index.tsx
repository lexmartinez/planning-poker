import * as React from 'react'
import { connect } from 'react-redux'
import Session from './view'
import { setLanguage, setSession, setError } from '../../actions/global'
import { logout } from '../../actions/auth'
import './style.css'

const mapStateToProps = (state: any) => {
  return ({
    ...state.auth,
    ...state.global
  })
}

const mapDispatchToProps = (dispatch: any) => ({
  setLanguage: (lang: string) => {
    dispatch(setLanguage(lang))
  },
  logout: () => {
    dispatch(logout())
  },
  setSession: (session: any) => {
    dispatch(setSession(session))
  },
  setError: (isError: boolean) => {
    dispatch(setError(isError))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Session)
