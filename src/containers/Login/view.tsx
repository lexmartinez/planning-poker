import * as React from 'react'
import Loading from 'react-loading-components'
import i18n from '../../config/i18n'
const electron = window.require('electron')
export default class Login extends React.Component<LoginProps, LoginState> {

  constructor (props: LoginProps) {
    super(props)
    this.state = {
      user: undefined,
      error: undefined,
      isAuthenticated: false,
      loading: false
    }

    this.login = this.login.bind(this)
  }

  componentDidMount () {
    document.body.classList.add('login')

    electron.ipcRenderer.on('github-oauth-reply', (event: any, { access_token }: any) => {
      this.setState({ loading: true, error: undefined })
      this.props.userInfo(access_token)
    })
  }

  componentWillReceiveProps (nextProps: any) {
    if ((nextProps.isAuthenticated && nextProps.user) || nextProps.error) {
      this.setState({
        user: nextProps.user,
        isAuthenticated: nextProps.isAuthenticated,
        error: nextProps.error,
        loading: false
      })
    }
  }

  componentDidUpdate () {
    if (this.state.isAuthenticated) {
      document.body.classList.remove('login')
      this.props.history.push('/')
    }
  }

  login () {
    electron.ipcRenderer.send('github-oauth', 'getToken')
  }

  render () {
    return (
        <div className={'wrapper'}>
            <img src={require('../../assets/images/cards.svg')} width={'90'} />
            <h1 className={'logo-title'}>Planning Poker</h1>
            <h2 className={'logo-subtitle'}>Let's Estimate</h2>
            {
                this.state.error ? <p>{`${this.state.error}`}</p> : undefined
            }
            <div className={'login-buttons'}>
            { this.state.loading ? <Loading type={'puff'} width={60} height={60} fill={'#ffffff'} /> :
              <div>
                {
                    // <a href={'#'} className={'button'}>
                    // <img className={'button-logo'} src={require('../../assets/images/google-logo.svg')}
                    // width={'24'}/> Login with Google</a>
                    // <br/><br/>
                }
                  <a href={'#'} className={'button'} onClick={this.login}>
                      <img className={'button-logo'} src={require('../../assets/images/github-logo.svg')}
                            width={'24'}/> {i18n.t('login.logIn')} GitHub</a>
               </div>
            }
            </div>
        </div>
    )
  }
}
