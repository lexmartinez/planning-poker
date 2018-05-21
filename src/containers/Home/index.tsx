import * as React from 'react'
import './style.css'

export default class Login extends React.Component {

  componentDidMount () {
    document.body.classList.add('home')
  }
  render () {
    return (
            <div className={'wrapper'}>
                <img src={require('../../assets/images/cards.svg')} width={'90'}/>
                <h1>Hoooooome</h1>
            </div>
    )
  }
}
