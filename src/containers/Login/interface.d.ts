interface LoginProps {
    userInfo: any,
    history: any,
    setLanguage: any,
    setLoading: any,
    setError: any
}

interface LoginState {
    user: any,
    error: any,
    isAuthenticated: boolean,
    loading: boolean
}