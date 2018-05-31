import * as React from 'react'
import { Header } from '../../components'
import { USER_LANG } from '../../config/constants'
import Icon from '@oovui/react-feather-icons'
import i18n from '../../config/i18n'

export default class Session extends React.Component <SessionProps> {

  constructor (props: SessionProps) {
    super(props)
    this.state = {
      lang: i18n.language
    }
    this.setLanguage = this.setLanguage.bind(this)
  }

  componentDidMount () {
    document.body.classList.add('home')
    document.body.classList.remove('login')
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
                setLanguage={this.setLanguage}/>
              <div className={'container'}>
                {this.props.match.params.id}
              </div>
            </div>
    )
  }
}
