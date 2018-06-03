interface HeaderProps {
    history: any,
    setLanguage: any,
    user: {
        name: string,
        email: string,
        avatar: string
    },
    logout: any
}

interface HeaderState {
    showMenu: boolean
}