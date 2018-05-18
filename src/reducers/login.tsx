import { LOGIN, LOGIN_OK, LOGIN_FAIL, LOGOUT } from '../types/login'

const initState = {
    isLoggedIn: false,
    user: undefined,
    error: undefined
}

export default (state = initState, action: any) => {
    console.log('Ak', action)
    switch (action.type) {
        case LOGIN :
            return { ...state, user: undefined, isLoggedIn: false, error: undefined}
        case LOGIN_OK :
            return { ...state, user: action.payload.user, isLoggedIn: true, error: undefined}
        case LOGIN_FAIL :
            return { ...state, user: undefined, isLoggedIn: false, error: action.payload.error}
        case LOGOUT :
            return { ...state, user: undefined, isLoggedIn: false}
        default :
        return state
    }
}