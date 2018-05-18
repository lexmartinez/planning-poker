import * as React from 'react'
import './style.css'

export default class Login extends React.Component {

    constructor(props: any) {
        super(props)
        this.state = {
          user: undefined,
          error: undefined,
          isLoggedIn: false
        }
    }

   componentWillReceiveProps(nextProps: any) {
        if (nextProps.user) {
          this.setState({
            user: nextProps.user,
            isLoggedIn: nextProps.isLoggedIn,
            error: nextProps.error
          })
        }
    }

    render() {
        const login = () => {
            const { authenticate } = this.props
            authenticate('user', 'password')
        }
        return (
            <div className={'wrapper'}>
                <img src={require('../../assets/images/cards.svg')} width={'90'}/>
                <h1 className={'logo-title'}>Planning Poker</h1>
                <h2 className={'logo-subtitle'}>Let's Estimate</h2>
                <div className={'login-buttons'}>
                {
                    // <a href={'#'} className={'button'}>
                    // <img className={'button-logo'} src={require('../../assets/images/google-logo.svg')}
                    // width={'24'}/> Login with Google</a>
                    // <br/><br/>
                }
                    <a href={'#'} className={'button'} onClick={login}>
                        <img className={'button-logo'} src={require('../../assets/images/github-logo.svg')}
                        width={'24'}/> Login with GitHub</a>
                </div>
            </div>
        )
    }
}