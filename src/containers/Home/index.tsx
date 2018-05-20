import * as React from 'react'
import './style.css'

export default class Login extends React.Component {

  render () {
    const login = () => {
      console.log('a')
    }
    return (
            <div className={'wrapper'}>
                <img src={require('../../assets/images/cards.svg')} width={'90'}/>
                <h1 className={'logo-title'}>Hoooooome</h1>
                <h2 className={'logo-subtitle'}>Let's Estimate</h2>
            </div>
    )
  }
}
