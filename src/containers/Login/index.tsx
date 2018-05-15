import * as React from 'react'
import './style.css'

export default class Login extends React.Component {
    render() {
        return (
            <div className={'wrapper'}>
                <img src={require('../../assets/images/cards.svg')} width={'90'}/>
                <h1 className={'logo-title'}>Planning Poker</h1>
                <h2 className={'logo-subtitle'}>Let's Estimate</h2>
                <div className={'login-buttons'}>
                    <a href={'#'} className={'button'}>
                        <img className={'button-logo'} src={require('../../assets/images/google-logo.svg')}
                        width={'24'}/> Login with Google</a>
                        <br/><br/>
                    <a href={'#'} className={'button'}>
                        <img className={'button-logo'} src={require('../../assets/images/github-logo.svg')}
                        width={'24'}/> Login with Github</a>
                        <br/><br/>
                </div>
            </div>
        )
    }
}