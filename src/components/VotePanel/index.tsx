import * as React from 'react'
import i18n from '../../config/i18n'
import Icon from '@oovui/react-feather-icons'
import 'react-tippy/dist/tippy.css'
import './style.css'
import Pusher from 'react-pusher'

const fibo = ['0','½','1','2','3','5','8','13','20','40','?','X']

export default class VotePanel extends React.Component<VotePanelProps, {}> {

  constructor (props: VotePanelProps) {
    super(props)
    this.sendVote = this.sendVote.bind(this)
    this.handleVote = this.handleVote.bind(this)
    this.renderVotingTable = this.renderVotingTable.bind(this)
  }

  renderMessage (message: string) {
    return (
        <div className={'empty-v-container'}>
            <Icon type ={'layers'} size={'200'} color={'#ABABAB'}/>
            <p className={'empty-v-message'}>{message}</p>
        </div>
    )
  }

  renderVotingTable () {
    const { session } = this.props
    const voting = session.voting[session.current] || []
    return (
        <div>
            <p className={'story-v-title'}><b>{i18n.t('session.current')}: </b>{session.backlog[session.current]}</p>
            {
                voting.map((vote: any) =>
                    <li className={'vote-item'} key={vote.email}>
                        <img src={vote.avatar} className={'avatar vote-img'}/>
                        <p className={'vote-data'}><b>{vote.name}</b><br/>{vote.email}</p>
                        <p className={'vote-value'}>
                        {
                          vote.vote === 'X' ? <i className={'fa fa-coffee'}></i> :
                          vote.vote === '?' ? <i className={'fa fa-question'}></i> : <b>{vote.vote}</b>
                        }
                        </p>
                    </li>
                )
            }
        </div>
    )
  }

  sendVote (vote: String) {
    const { session, user } = this.props
    window.ipcRenderer.send('handle-vote', {
      user,
      session,
      vote
    })
  }

  handleVote (event: any) {
    const { user, vote } = event.data
    let body = `${i18n.t('session.votes')} ${vote} pts`
    if (vote === 'X') {
      body = `${i18n.t('session.votes')} \u2615`
    } else if (vote === '?') {
      body = `${i18n.t('session.votes')} \u2753`
    }
    const notification = new Notification(user.name, {
      icon: user.avatar,
      body,
      silent: true
    })
    window.ipcRenderer.send('get-session', this.props.session.sid)
  }

  render () {
    const { session, user } = this.props
    let voted = false
    const list = (session.voting[session.current]) || []
    list.forEach((item: any) => {
      if (item.email === user.email) { voted = true }
    })

    if (session.status === 'CREATED' || session.status === 'COMPLETED') {
      return this.renderMessage(session.status === 'CREATED' ? i18n.t('session.noVoting') : i18n.t('session.completed'))
    }

    return (
        <div className={'story-v-container'}>
        {
          voted ? this.renderVotingTable() :
          <div>
              <p className={'story-v-title'}><b>{i18n.t('session.current')}: </b>{session.backlog[session.current]}</p>
              <div className={'deck-container'}>
                  {
                      fibo.map((card: any) =>
                      <a className={'v-card'} key={card} onClick={() => { this.sendVote(card) }}>
                          {
                            card === 'X' ? <i className={'fa fa-coffee'}></i> :
                            card === '?' ? <i className={'fa fa-question'}></i> : card
                          }
                      </a>)
                  }
              </div>
          </div>
        }

            <Pusher
                channel={session.sid}
                event={'vote-event'}
                onUpdate={this.handleVote}
            />
        </div>
    )
  }

}
