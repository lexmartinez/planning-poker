import * as React from 'react'
import { connect } from 'react-redux'
import Session from './view'
import setLanguage from '../../actions/language'
import './style.css'

const mapStateToProps = (state: any) => {
  return ({
    ...state.authReducer,
    ...state.langReducer
  })
}

const mapDispatchToProps = (dispatch: any) => ({
  setLanguage: (lang: string) => {
    dispatch(setLanguage(lang))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Session)
