import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './config/store'
import AppRoutes from './config/routes'

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes/>
  </Provider>,
  document.getElementById('root')
)