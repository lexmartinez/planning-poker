interface HomeProps {
    history: any,
    user: {
        avatar: string,
        name: string,
        email: string
    },
    setLanguage: any,
    setLoading: any,
    setError: any,
    setSession: any,
    logout: any
}

interface HomeState {
    lang: string,
    sessionId?: string,
    error: boolean,
    loading: boolean
}