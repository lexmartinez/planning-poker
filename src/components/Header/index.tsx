import * as React from 'react'

import './style.css'
export default ({ user }: Header) => {
  return (
      <div className={'navbar'}>
          <div className={'avatar-container'}>
            <img src={user.avatar_url} className={'avatar'}/>
            <p className={'avatar-info'}>{user.name}</p>
          </div>
      </div>
  )
}
