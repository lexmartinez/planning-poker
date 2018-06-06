import * as React from 'react'
import { Header } from '../../components'
import { USER_LANG, OAUTH_PROVIDER, APP_NAME } from '../../config/constants'
import Icon from '@oovui/react-feather-icons'
import i18n from '../../config/i18n'
import 'react-tippy/dist/tippy.css'
import { Tooltip } from 'react-tippy'

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
                     <ul className={'card-tabs'}>
                       <li><a className={'active'}>{i18n.t('session.online')} (5)</a></li>
                       <li><a>{i18n.t('session.team')}</a></li>
                       <li className={'right-item'}>
                        <Tooltip title={i18n.t('session.invite')} position={'bottom'}>
                          <a><Icon type ={'user-plus'} size={'20'} color={'#ffffff'}/></a>
                        </Tooltip>
                       </li>
                     </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    )
  }
}
