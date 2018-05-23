import * as React from 'react'
import i18n from '../../config/i18n'
import { OAUTH_TOKEN, APP_NAME } from '../../config/constants'
import './style.css'

export default class Header extends React.Component<HeaderProps, HeaderState> {

  constructor (props: HeaderProps) {
    super(props)
    this.state = {
      showMenu: false
    }
    this.showMenu = this.showMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.logout = this.logout.bind(this)
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
    document.body.classList.remove('home')
    this.props.history.push('/login')
  }

  about () {
    window.ipcRenderer.send('about-dialog')
  }

  render () {
    const { user } = this.props
    return (
      <div className={'navbar'}>
          <div className={'avatar-container'}>
            <img src={user.avatar_url} className={'avatar'}/>
            <p className={'avatar-info'}>{i18n.t('home.hello')}, {user.name}</p>
            <a className={'settings-btn'} onClick={this.showMenu}><i className={'fa fa-chevron-down'}></i></a>
            <div className={'dropdown'}>
              {
              this.state.showMenu ?
                <div className={'dropdown-content open'}>
                  <a onClick={this.about}>{i18n.t('home.about')} {APP_NAME}</a>
                  <a>Language <b>en</b>/es</a>
                  <a onClick={this.logout}>{i18n.t('home.logout')}</a>
                </div> : undefined
              }
          </div>
          </div>
      </div>
    )
  }
}
