interface LoginProps {
    userInfo: any,
    history: any
}

interface LoginState {
    user: any,
    error: any,
    isAuthenticated: boolean,
    loading: boolean
}