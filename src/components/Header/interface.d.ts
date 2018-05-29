interface HeaderProps {
    history: any,
    setLanguage: any,
    user: {
        name: string,
        email: string,
        avatar: string
    },
}

interface HeaderState {
    showMenu: boolean
}