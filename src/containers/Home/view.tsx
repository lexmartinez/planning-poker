import * as React from 'react'
import { Header } from '../../components'
import { USER_LANG } from '../../config/constants'
import Icon from '@oovui/react-feather-icons'
import i18n from '../../config/i18n'

export default class Home extends React.Component <HomeProps> {

  constructor (props: HomeProps) {
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
    const { name, email, avatar_url, picture } = this.props.user
    return (
            <div>
              <Header user={{ name, email, avatar_url, picture }} history={this.props.history}
                setLanguage={this.setLanguage}/>
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
                    <input type={'text'} placeholder={'XXXX-XXXX-XXXX-XXXX'} className={'input'}/>
                    <div className={'button-container'}>
                      <a className={'button'}>{i18n.t('home.join.button')}</a>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    )
  }
}
