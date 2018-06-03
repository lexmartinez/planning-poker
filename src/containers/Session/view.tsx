import * as React from 'react'
import { Header } from '../../components'
import { USER_LANG, OAUTH_PROVIDER } from '../../config/constants'
import Icon from '@oovui/react-feather-icons'
import i18n from '../../config/i18n'

export default class Session extends React.Component <SessionProps, SessionState> {

  constructor (props: SessionProps) {
    super(props)
    this.state = {
      lang: i18n.language,
      sessionId: undefined
    }
    this.setLanguage = this.setLanguage.bind(this)
    this.copyToClipboard = this.copyToClipboard.bind(this)
  }

  componentDidMount () {
    document.body.classList.add('session')
    document.body.classList.remove('home')
    this.setState({ sessionId: this.props.match.params.id })

    window.ipcRenderer.on('copy-sid-reply', (event: any, { response }: any) => {
      console.log('s-auth',response)
      if (response) {
        alert('Copied blablavblavl')
      }
    })
  }

  setLanguage () {
    const lang = i18n.t('home.lang.target')
    i18n.changeLanguage(lang, (err: any, t: any) => {
      if (err) return console.log('something went wrong loading', err)
      window.localStorage.setItem(USER_LANG, lang)
      this.props.setLanguage(lang)
    })
  }

  copyToClipboard () {
    window.ipcRenderer.send('copy-sid', this.state.sessionId)
  }

  render () {
    const { name, email, avatar } = this.props.user
    return (
            <div>
              <Header user={{ name, email, avatar }} history={this.props.history}
                setLanguage={this.setLanguage} logout={this.props.logout}/>
              <div className={'container'}>
                <div className={'topbar'}>
                  <ul>
                    <li>
                      <a onClick={this.copyToClipboard} className={'clipboard'}>
                        <Icon type ={'clipboard'} size={'20'} color={'#d0e0ef'}/>
                      </a>
                    </li>
                    <li>
                      <b>Session ID: </b> {this.state.sessionId}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
    )
  }
}
