import * as React from 'react'
import { Header, SidePanel, VotePanel } from '../../components'
import { USER_LANG, OAUTH_PROVIDER, APP_NAME } from '../../config/constants'
import Icon from '@oovui/react-feather-icons'
import i18n from '../../config/i18n'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'
import Pusher from 'react-pusher'

export default class Session extends React.Component <SessionProps, SessionState> {

  constructor (props: SessionProps) {
    super(props)
    this.state = {
      lang: i18n.language,
      session: this.props.session
    }

    this.updateSession = this.updateSession.bind(this)
  }

  componentDidMount () {
    document.body.classList.add('session')
    document.body.classList.remove('home')

    window.ipcRenderer.on('get-session-reply', (event: any, { session }: any) => {
      if (session) {
        this.props.setSession(session)
      } else {
        this.props.setError(true)
      }
    })

  }

  componentWillReceiveProps ({ session }: any) {
    this.setState({ session })
  }

  updateSession () {
    window.ipcRenderer.send('get-session', this.state.session.sid)
  }

  render () {
    const { name, email, avatar } = this.props.user
    return (
            <div>
              <Header user={{ name, email, avatar }} history={this.props.history}
                setLanguage={this.props.setLanguage} logout={this.props.logout} session={this.state.session}/>
              <div className={'container'}>
                <div className={'main-panel'}>
                  <VotePanel session={this.state.session} user={this.props.user}/>
                </div>
                <div className={'side-panel'}>
                  <SidePanel session={this.state.session} user={this.props.user}/>
                </div>
              </div>
              <Pusher
                channel={this.state.session.sid}
                event={'session-updated'}
                onUpdate={this.updateSession}
              />
            </div>
    )
  }
}
