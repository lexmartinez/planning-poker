import * as React from 'react'
import { connect } from 'react-redux'
import Home from './view'
import { setLanguage, setLoading, setError } from '../../actions/global'
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
  setLoading: (loading: boolean) => {
    dispatch(setLoading(loading))
  },
  setError: (isError: boolean) => {
    dispatch(setError(isError))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
