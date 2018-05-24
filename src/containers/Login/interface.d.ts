interface LoginProps {
    userInfo: any,
    history: any,
    setLanguage: any
}

interface LoginState {
    user: any,
    error: any,
    isAuthenticated: boolean,
    loading: boolean
}