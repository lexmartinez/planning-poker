import * as React from 'react'
import { connect } from 'react-redux'
import auth from '../../actions/auth'
import Login from './view'
import './style.css'

const mapStateToProps = (state: any) => {
  return ({
    ...state.authReducer
  })
}

const mapDispatchToProps = (dispatch: any) => ({
  login: () => {
    dispatch(auth('lexmartinez'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
