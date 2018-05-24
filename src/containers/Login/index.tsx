import * as React from 'react'
import { connect } from 'react-redux'
import userInfo from '../../actions/auth'
import setLanguage from '../../actions/language'
import Login from './view'

const mapStateToProps = (state: any) => {
  return ({
    ...state.authReducer,
    ...state.langReducer
  })
}

const mapDispatchToProps = (dispatch: any) => ({
  userInfo: (authToken: string) => {
    dispatch(userInfo(authToken))
  },
  setLanguage: (lang: string) => {
    dispatch(setLanguage(lang))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
