interface SessionProps {
    history: any,
    user: {
        avatar: string,
        name: string,
        email: string
    },
    setLanguage: any,
    match: any,
    logout: any,
    session?: any
}

interface SessionState {
    lang: string,
    session?: any
}  