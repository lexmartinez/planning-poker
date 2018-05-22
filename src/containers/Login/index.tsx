import * as React from 'react'
import { connect } from 'react-redux'
import userInfo from '../../actions/auth'
import Login from './view'

const mapStateToProps = (state: any) => {
  return ({
    ...state.authReducer
  })
}

const mapDispatchToProps = (dispatch: any) => ({
  userInfo: (authToken: string) => {
    dispatch(userInfo(authToken))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
