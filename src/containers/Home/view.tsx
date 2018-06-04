import * as React from 'react'
import { Header, Loading } from '../../components'
import { USER_LANG, SID_REGEX } from '../../config/constants'
import Icon from '@oovui/react-feather-icons'
import i18n from '../../config/i18n'
import { format } from '../../services'
export default class Home extends React.Component <HomeProps, HomeState> {

  constructor (props: HomeProps) {
    super(props)
    this.state = {
      lang: i18n.language,
      sessionId: undefined,
      error: false,
      loading: false
    }
    this.setLanguage = this.setLanguage.bind(this)
    this.startSession = this.startSession.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    document.body.classList.add('home')
    document.body.classList.remove('login')

    window.ipcRenderer.on('session-auth-reply', (event: any, { response }: any) => {
      this.props.setLoading(false)
      if (response) {
        this.props.setSession(response)
        this.props.history.push(`/session/${this.state.sessionId}`)
      } else {
        this.props.setError(true)
      }
    })
  }

  componentWillReceiveProps (nextProps: any) {
    this.setState({
      error: nextProps.error,
      loading: nextProps.loading
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
                setLanguage={this.setLanguage} logout={this.props.logout}/>
              <div className={'container'}>
                <div className={'card-home card-white'}>
                  <div>
                      <div className={'card-image'}>
                        <Icon type ={'airplay'} size={'130'} color={'#50548d'}/>
                      </div>
                      <div className={'create-container'}>
                      <h1 className={'title'}>{i18n.t('home.create.title')}</h1>
                      <h2 className={'subtitle mrg-btm'}>{i18n.t('home.create.subtitle')}</h2>
                        <a className={'button'}>{i18n.t('home.create.button')}</a>
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
