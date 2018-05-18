import { createStore, combineReducers, applyMiddleware } from 'redux'
import loginReducer from '../reducers/login'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const reducer = combineReducers({
    loginReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk),
    applyMiddleware(logger)
)

export default store