import * as React from 'react'
import Loading from 'react-loading-components'
import './style.css'

export default () => {
  return (
    <div className={'loading'}>
      <Loading type={'puff'} width={80} height={80} fill={'#50548d'} />
    </div>
  )
}
