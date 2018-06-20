import * as React from 'react'
import { Header, Loading } from '../../components'
import { USER_LANG, SID_REGEX } from '../../config/constants'
import Icon from '@oovui/react-feather-icons'
import i18n from '../../config/i18n'
import { format } from '../../services'
import { setPusherClient } from 'react-pusher'
import * as Pusher from 'pusher-js'

export default class Home extends React.Component <HomeProps, HomeState> {

  constructor (props: HomeProps) {
    super(props)
    this.state = {
      lang: i18n.language,
      sessionId: undefined,
      error: false,
      loading: false
    }
    this.startSession = this.startSession.bind(this)
    this.createSession = this.createSession.bind(this)
    this.handleChange = this.handleChange.bind(this)

    const pusherClient = new Pusher('1f91e409eba4328fbbe6',{
      cluster: 'us2'
    })

    setPusherClient(pusherClient)
  }

  componentDidMount () {
    document.body.classList.add('home')
    document.body.classList.remove('login')

    window.ipcRenderer.send('set-language', { lang: i18n.language, loggedIn: true })

    window.ipcRenderer.on('session-auth-reply', (event: any, { response }: any) => {
      this.props.setLoading(false)
      if (response) {
        this.props.setSession(response)
        this.props.history.push(`/session/${this.state.sessionId}`)
      } else {
        this.props.setError(true)
      }
    })

    window.ipcRenderer.on('create-session-reply', (event: any, session: any) => {
      this.props.setLoading(false)
      if (session) {
        this.props.setSession(session)
        this.props.history.push(`/session/${this.state.sessionId}`)
      } else {
        // TODO: HANDLE THIS ERROR!
        alert('error')
        // this.props.setError(true)
      }
    })
  }

  componentWillReceiveProps ({ error, loading }: any) {
    this.setState({ error, loading })
  }

  startSession () {
    if (this.state.sessionId && SID_REGEX.test(this.state.sessionId)) {
      const { email } = this.props.user
      this.props.setLoading(true)
      window.ipcRenderer.send('session-auth', {
        sid: this.state.sessionId,
        email
      })
    } else {
      this.props.setError(true)
    }
  }

  createSession () {
    const { email } = this.props.user
    this.props.setLoading(true)
    window.ipcRenderer.send('create-session', email)
  }

  handleChange (event: any) {
    this.props.setError(false)
    const text = event.target.value.toUpperCase()
    const sessionId = format.sessionId(text.replace(/[^A-Za-z0-9]/g, ''))
    this.setState({ sessionId })
  }

  render () {
    const { name, email, avatar } = this.props.user
    return (
            <div>
              {this.state.loading ? <Loading/> : undefined }
              <Header user={{ name, email, avatar }} history={this.props.history}
                setLanguage={this.props.setLanguage} logout={this.props.logout}/>
              <div className={'container'}>
                <div className={'card-home card-white'}>
                  <div>
                      <div className={'card-image'}>
                        <Icon type ={'airplay'} size={'130'} color={'#50548d'}/>
                      </div>
                      <div className={'create-container'}>
                      <h1 className={'title'}>{i18n.t('home.create.title')}</h1>
                      <h2 className={'subtitle mrg-btm'}>{i18n.t('home.create.subtitle')}</h2>
                        <a className={'button'} onClick={this.createSession}>{i18n.t('home.create.button')}</a>
                      </div>
                  </div>
                </div>
                <div className={'card-home card-white'}>
                  <div>
                    <div className={'card-image'}>
                      <Icon type ={'users'} size={'130'} color={'#50548d'}/>
                    </div>
                    <div className={'create-container'}>
                    <h1 className={'title'}>{i18n.t('home.join.title')}</h1>
                    <h2 className={'subtitle'}>{`${i18n.t('home.join.subtitle')} :`}</h2>
                    <input type={'text'} placeholder={'XXXX-XXXX-XXXX-XXXX'}
                      className={`input ${this.state.error ? 'error' : ''}`}
                      value={this.state.sessionId || ''}
                      onChange={this.handleChange} />
                      {
                        this.state.error ?
                        <p className={'error error-no-padding'}>{i18n.t('home.join.error')}</p> : undefined
                      }
                    <div className={'button-container'}>
                      <a className={'button'} onClick={this.startSession}>{i18n.t('home.join.button')}</a>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    )
  }
}
