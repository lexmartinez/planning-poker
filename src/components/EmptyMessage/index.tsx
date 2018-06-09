import * as React from 'react'
import i18n from '../../config/i18n'
import Icon from '@oovui/react-feather-icons'
import './style.css'

export default (props: EmptyMessageProps) => {
  return (<div>
            <div className={'empty-message'}>
                <Icon type ={props.icon} size={'180'} color={'#a2a4b5'}/>
                <p className={'empty-message-text'}><b>Oops!&nbsp;{i18n.t(props.message)}</b>
                   <br/>{i18n.t(props.hint)}
                </p>
            </div>
          </div>)
}
