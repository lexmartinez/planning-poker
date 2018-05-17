import { LOGIN, LOGOUT } from '../types/login'

const initState = {
    isLoggedIn: false,
    user: undefined
}

export default (state = initState, action: any) => {
    switch (action.type) {
        case LOGIN :
            return { ...state, user: action.payload.user, isLoggedIn: true}
        case LOGOUT :
            return { ...state, user: undefined, isLoggedIn: false}
        default :
        return state
    }
}