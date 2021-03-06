interface VotePanelProps {
    session: any,
    user: {
        name: string,
        email: string,
        avatar: string
    }
}

interface NotificationOptions {
    body?: string,
    icon?: string,
    silent: boolean
}
