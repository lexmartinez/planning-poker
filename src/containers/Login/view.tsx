import * as React from 'react'
import i18n from '../../config/i18n'
import { OAUTH_TOKEN, OAUTH_PROVIDER, APP_NAME, USER_LANG } from '../../config/constants'
import { Loading } from '../../components'

export default class Login extends React.Component<LoginProps, LoginState> {

  constructor (props: LoginProps) {
    super(props)
    this.state = {
      user: undefined,
      error: undefined,
      isAuthenticated: false,
      loading: false
    }
    this.github = this.github.bind(this)
    this.google = this.google.bind(this)
    this.setUserData = this.setUserData.bind(this)
  }

  componentWillMount () {
    const lang = window.localStorage.getItem(USER_LANG)
    if (lang && lang !== '') {
      i18n.changeLanguage(lang, (err: any, t: any) => {
        if (err) return console.log('something went wrong loading', err)
        this.props.setLanguage(lang)
      })
    } else {
      window.localStorage.setItem(USER_LANG, i18n.language)
      this.props.setLanguage(i18n.language)
    }
  }

  setUserData (accessToken: string, provider: string) {
    this.props.setLoading(true)
    this.props.setError(false)
    window.localStorage.setItem(OAUTH_TOKEN, accessToken)
    window.localStorage.setItem(OAUTH_PROVIDER, provider)
    this.props.userInfo(accessToken, provider)
  }

  componentDidMount () {
    window.ipcRenderer.on('github-oauth-reply', (event: any, { access_token }: any) => {
      this.setUserData(access_token, 'github')
    })

    window.ipcRenderer.on('google-oauth-reply', (event: any, { access_token }: any) => {
      this.setUserData(access_token, 'google')
    })

    const token = window.localStorage.getItem(OAUTH_TOKEN)
    if (token && token !== '') {
      const provider = window.localStorage.getItem(OAUTH_PROVIDER)
      this.props.userInfo(token, provider)
    } else {
      document.body.classList.add('login')
    }
  }

  componentWillReceiveProps (nextProps: any) {
    if ((nextProps.isAuthenticated && nextProps.user) || nextProps.error || nextProps.loading) {
      this.setState({
        user: nextProps.user,
        isAuthenticated: nextProps.isAuthenticated,
        error: nextProps.error,
        loading: nextProps.loading
      })
    }
  }

  componentDidUpdate () {
    if (this.state && this.state.isAuthenticated) {
      document.body.classList.remove('login')
      this.props.history.push('/')
    }
  }

  github () {
    window.ipcRenderer.send('github-oauth', 'getToken')
  }

  google () {
    window.ipcRenderer.send('google-oauth', 'getToken')
  }

  render () {
    const token = window.localStorage.getItem(OAUTH_TOKEN)
    if (token && token !== '') {
      document.body.classList.remove('login')
      return <Loading/>
    }
    document.body.classList.add('login')
    return (
        <div className={'wrapper'}>
            {this.state.loading ? <Loading/> : undefined }
            <img src={require('../../assets/images/cards.svg')} width={'90'} />
            <h1 className={'logo-title'}>{APP_NAME}</h1>
            <h2 className={'logo-subtitle'}>A Planning Poker Tool</h2>
            { this.state.error ? <p>{`${this.state.error}`}</p> : undefined }
            <div className={'login-buttons'}>
              <div>
                  <a href={'#'} className={'button'} onClick={this.google}>
                      <img className={'button-logo'} src={require('../../assets/images/google-logo.svg')}
                            width={'24'}/> {i18n.t('login.logIn')} Google</a>
                    <br/><br/>
                  <a href={'#'} className={'button'} onClick={this.github}>
                      <img className={'button-logo'} src={require('../../assets/images/github-logo.svg')}
                            width={'24'}/> {i18n.t('login.logIn')} GitHub</a>
              </div>
            </div>
        </div>
    )
  }
}
