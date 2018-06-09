interface SidePanelProps {
    session: any,
    user: {
        name: string,
        email: string,
        avatar: string
    }
}

interface SidePanelState {
    currentTab: string
}