import * as React from 'react'
import i18n from '../../config/i18n'
import Icon from '@oovui/react-feather-icons'
import './style.css'

export default (props: SuccessMessageProps) => {
  return props.show ?
        <div className={'success-message'}>
          <Icon type ={props.icon || 'check-circle'} size={'90'} color={'#ffffff'}/>
          <h1>{i18n.t(props.message)}</h1>
        </div> : <div></div>
}
