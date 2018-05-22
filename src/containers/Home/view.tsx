import * as React from 'react'
import { Header } from '../../components'

export default class Home extends React.Component <HomeProps> {

  componentDidMount () {
    document.body.classList.add('home')
  }
  render () {
    const { name, email, avatar_url } = this.props.user
    return (
            <div className={'wrapper'}>
              <Header user={{ name, email, avatar_url }}/>
            </div>
    )
  }
}
