import * as React from 'react'
import { connect } from 'react-redux'
import Session from './view'
import { setLanguage } from '../../actions/global'
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Session)
