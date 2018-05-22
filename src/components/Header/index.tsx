import * as React from 'react'
import i18n from '../../config/i18n'
import './style.css'
export default ({ user }: Header) => {
  return (
      <div className={'navbar'}>
          <div className={'avatar-container'}>
            <img src={user.avatar_url} className={'avatar'}/>
            <p className={'avatar-info'}>{i18n.t('home.hello')}, {user.name}</p>
          </div>
      </div>
  )
}
