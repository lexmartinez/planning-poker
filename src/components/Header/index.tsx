import * as React from 'react'
import i18n from '../../config/i18n'
import { OAUTH_TOKEN, OAUTH_PROVIDER, APP_NAME, USER_LANG } from '../../config/constants'
import Icon from '@oovui/react-feather-icons'
import 'react-tippy/dist/tippy.css'
import './style.css'
import { Tooltip } from 'react-tippy'

export default class Header extends React.Component<HeaderProps, HeaderState> {

  constructor (props: HeaderProps) {
    super(props)
    this.state = {
      showMenu: false
    }
    this.showMenu = this.showMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.logout = this.logout.bind(this)
    this.copyToClipboard = this.copyToClipboard.bind(this)
  }

  showMenu () {
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu)
    })
  }

  closeMenu () {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu)
    })
  }

  logout () {
    window.localStorage.removeItem(OAUTH_TOKEN)
    window.localStorage.removeItem(OAUTH_PROVIDER)
    document.body.classList.remove('home')
    document.body.classList.remove('session')
    this.props.logout()
    this.props.history.push('/login')
  }

  about () {
    window.ipcRenderer.send('about-dialog')
  }

  copyToClipboard () {
    window.ipcRenderer.send('copy-sid', this.props.session.sid)
  }

  render () {
    const { user } = this.props
    return (
      <div className={'navbar'}>
          {
            this.props.session ?
              <div className={'session-panel'}>
                <Tooltip title={i18n.t('session.copyClipboard')}>
                  <a onClick={this.copyToClipboard} className={'clipboard'}>
                    <Icon type ={'clipboard'} size={'20'} color={'#50548d'}/>
                  </a>
                </Tooltip>
                <b className={'sid-title'}>{i18n.t('session.sid')}:</b>{this.props.session.sid}
              </div> : undefined
          }
          <div className={'avatar-container'}>
            <img src={ user.avatar } className={'avatar'}/>
            <p className={'avatar-info'}>{i18n.t('home.hello')}, {user.name}</p>
            <Tooltip title={i18n.t('home.menu')} distance={0}>
              <a className={'settings-btn'} onClick={this.showMenu}><i className={'fa fa-chevron-down'}></i></a>
            </Tooltip>
            <div className={'dropdown'}>
              {
              this.state.showMenu ?
                <div className={'dropdown-content open'}>
                  <a onClick={this.about}>{i18n.t('home.about')} {APP_NAME}</a>
                  <a onClick={this.props.setLanguage}>{i18n.t('home.lang.label')} <b>
                    {i18n.t('home.lang.targetName')}</b></a>
                  <a onClick={this.logout}>{i18n.t('home.logout')}</a>
                </div> : undefined
              }
          </div>
          </div>
      </div>
    )
  }
}
