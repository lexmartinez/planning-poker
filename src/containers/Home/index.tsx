import * as React from 'react'
import { connect } from 'react-redux'
import Home from './view'
import './style.css'

const mapStateToProps = (state: any) => {
  return ({
    ...state.authReducer
  })
}

const mapDispatchToProps = (dispatch: any) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
