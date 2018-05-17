import * as React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    BrowserRouter,
    Switch,
    withRouter
  } from 'react-router-dom'
import Login from '../views/Login'
import Header from '../components/Header'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} render={(props: any) => {
        console.log(props)
       return (
            isAuthenticated === true ? <Component {...props} />  : <Redirect to='/login' />
        )
    }} />
  )
export default () => {
 return (
   <BrowserRouter>
    <Switch>
        <Route exact={true} path={'/login'} component={Login}/>
        <PrivateRoute isAuthenticated={false} path='/' component={Header} />
    </Switch>
   </BrowserRouter>
 )
}