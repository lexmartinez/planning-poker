import * as React from 'react'
import { Header, SidePanel, VotePanel } from '../../components'
import { APP_NAME } from '../../config/constants'
import i18n from '../../config/i18n'
import 'react-tippy/dist/tippy.css'
import Pusher from 'react-pusher'

export default class Session extends React.Component <SessionProps, SessionState> {

  constructor (props: SessionProps) {
    super(props)
    this.state = {
      lang: i18n.language,
      session: this.props.session
    }

    this.updateSession = this.updateSession.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
    this.nextStory = this.nextStory.bind(this)
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

  updateStatus (status: String) {
    const { session } = this.state
    if ((session.backlog || []).length > 0 && (session.team || []).length > 1) {
      window.ipcRenderer.send('update-session', {
        session: {
          sid: session.sid,
          status
        },
        labels: {
          title: APP_NAME,
          message: i18n.t('session.confirmUpdate'),
          yes: i18n.t('global.yes'),
          no: i18n.t('global.no')
        }
      })
    } else {
      alert(i18n.t('session.statusValidation'))
    }
  }

  nextStory () {
    const { session } = this.state
    window.ipcRenderer.send('update-session', {
      session: {
        sid: session.sid,
        current: (session.current + 1)
      },
      labels: {
        title: APP_NAME,
        message: i18n.t('session.confirmUpdate'),
        yes: i18n.t('global.yes'),
        no: i18n.t('global.no')
      }
    })
  }

  render () {
    const { name, email, avatar } = this.props.user
    const { session } = this.state
    return (
            <div>
              <Header user={{ name, email, avatar }} history={this.props.history}
                setLanguage={this.props.setLanguage} logout={this.props.logout} session={session}/>
              <div className={'container'}>
                <div className={'main-panel'}>
                  <VotePanel session={session} user={this.props.user}/>
                </div>
                <div className={'side-panel'}>
                  <SidePanel session={session} user={this.props.user}/>
                  {
                      session.host === email ?
                      <div className={'side-buttons'}>
                      {
                        session.status === 'CREATED' ?
                          <a className={'session-button'} onClick={() => { this.updateStatus('STARTED') }}>
                          {i18n.t('session.buttons.start')}</a> :
                        session.status === 'STARTED' ?
                          <a className={'session-button'} onClick={() => { this.updateStatus('COMPLETED') }}>
                          {i18n.t('session.buttons.end')}</a> : undefined
                      }
                      {
                        session.status === 'STARTED'
                          && session.backlog.length > (session.current + 1) ?
                        <a className={'session-button'} onClick={this.nextStory}>
                          {i18n.t('session.buttons.next')}
                        </a> : undefined
                      }
                      </div> : undefined
                  }
                </div>
              </div>
              <Pusher
                channel={session.sid}
                event={'session-updated'}
                onUpdate={this.updateSession}
              />
            </div>
    )
  }
}
