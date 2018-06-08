interface TeamPanelProps {
    session: any,
    user: {
        name: string,
        email: string,
        avatar: string
    }
}

interface TeamPanelState {
    currentTab: string
}