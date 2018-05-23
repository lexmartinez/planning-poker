import * as React from 'react'
import { Header } from '../../components'

export default class Home extends React.Component <HomeProps> {

  componentDidMount () {
    document.body.classList.add('home')
  }
  render () {
    const { name, email, avatar_url } = this.props.user
    return (
            <div>
              <Header user={{ name, email, avatar_url }} history={this.props.history}/>
              <div className={'container'}>
                <div className={'card-home'}>Create Planning Session</div>
                <div className={'card-home'}>Join Planning Session</div>
              </div>
            </div>
    )
  }
}
