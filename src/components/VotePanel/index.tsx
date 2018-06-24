import * as React from 'react'
import i18n from '../../config/i18n'
import Icon from '@oovui/react-feather-icons'
import 'react-tippy/dist/tippy.css'
import './style.css'

const fibo = ['0','½','1','2','3','5','8','13','20','40','?','X']

export default class VotePanel extends React.Component<VotePanelProps, VotePanelState> {

  constructor (props: VotePanelProps) {
    super(props)

  }

  renderMessage (message: string) {
    return (
        <div className={'empty-v-container'}>
            <Icon type ={'layers'} size={'200'} color={'#ABABAB'}/>
            <p className={'empty-v-message'}>{message}</p>
        </div>
    )
  }

  render () {
    const { session } = this.props
    if (session.status === 'CREATED' || session.status === 'COMPLETED') {
      return this.renderMessage(session.status === 'CREATED' ? i18n.t('session.noVoting') : i18n.t('session.completed'))
    }
    return (
        <div className={'story-v-container'}>
            <p className={'story-v-title'}><b>Current Story: </b>{session.backlog[session.current]}</p>
            <div className={'deck-container'}>
                {
                    fibo.map((card: any) =>
                    <a className={'v-card'} key={card}>
                        {
                          card === 'X' ? <i className={'fa fa-coffee'}></i> :
                          card === '?' ? <i className={'fa fa-question'}></i> : card
                        }
                    </a>)
                }
            </div>
        </div>
    )
  }

}
