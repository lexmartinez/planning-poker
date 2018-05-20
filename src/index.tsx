import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { Login, Home } from './containers'
import { PrivateRoute } from './components'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'

const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware, logger, thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path={'/login'} component={Login} />
        <PrivateRoute exact path={'/'} component={Home} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
