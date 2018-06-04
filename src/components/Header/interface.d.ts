interface HeaderProps {
    history: any,
    setLanguage: any,
    user: {
        name: string,
        email: string,
        avatar: string
    },
    logout: any,
    session?: any
}

interface HeaderState {
    showMenu: boolean
}