import * as React from 'react'
import { Header } from '../../components'
import { USER_LANG, OAUTH_PROVIDER, APP_NAME } from '../../config/constants'
import Icon from '@oovui/react-feather-icons'
import i18n from '../../config/i18n'

export default class Session extends React.Component <SessionProps, SessionState> {

  constructor (props: SessionProps) {
    super(props)
    this.state = {
      lang: i18n.language,
      session: this.props.session
    }
    this.setLanguage = this.setLanguage.bind(this)
  }

  componentDidMount () {
    document.body.classList.add('session')
    document.body.classList.remove('home')

    window.ipcRenderer.on('copy-sid-reply', (event: any, { response }: any) => {
      if (response) {
        const notification = new Notification(APP_NAME, {
          body: i18n.t('session.copySuccess')
        })
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

  render () {
    const { name, email, avatar } = this.props.user
    return (
            <div>
              <Header user={{ name, email, avatar }} history={this.props.history}
                setLanguage={this.setLanguage} logout={this.props.logout} session={this.state.session}/>
              <div className={'container'}>
                <div className={'main-panel'}></div>
                <div className={'team-panel'}>
                  <div className={'card'}>
                    <div className={'card-title'}>
                     <b>Teammates</b>
                    </div>
                    <div className={'card-button'}>
                     <a><Icon type ={'user-plus'} size={'20'} color={'#50548d'}/>
                        <span>Invite a Teammate</span></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    )
  }
}
