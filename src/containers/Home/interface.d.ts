interface HomeProps {
    history: any,
    user: {
        avatar: string,
        name: string,
        email: string
    },
    setLanguage: any
}

interface HomeState {
    lang: string,
    sessionId?: string,
    error: boolean
}