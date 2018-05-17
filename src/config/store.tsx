import { createStore, combineReducers, applyMiddleware } from 'redux'
import loginReducer from '../reducers/login'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    loginReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store