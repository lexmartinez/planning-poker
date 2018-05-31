interface SessionProps {
    history: any,
    user: {
        avatar: string,
        name: string,
        email: string
    },
    setLanguage: any,
    session?: string,
    match: any
}