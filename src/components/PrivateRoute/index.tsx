import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router'
class PrivateRoute extends React.Component <{isAuthenticated: boolean, component: any}> {
  render () {
    const {
      isAuthenticated,
      component: Component,
      ...props
    } = this.props

    return (
        <Route
          {...props}
          render={(props: any) =>
            isAuthenticated
              ? <Component {...props} />
              : (
              <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }} />
            )
          }
        />
    )
  }
}

export default connect((state: any) => ({
  isAuthenticated: state.auth.isAuthenticated
}))(PrivateRoute)
