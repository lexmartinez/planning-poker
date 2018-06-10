import * as React from 'react'
import { Header, SidePanel } from '../../components'
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
                <div className={'side-panel'}>
                  <SidePanel session={this.state.session} user={this.props.user}/>
                </div>
              </div>
            </div>
    )
  }
}
