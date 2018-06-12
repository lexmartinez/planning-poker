import * as React from 'react'
import i18n from '../../config/i18n'
import Icon from '@oovui/react-feather-icons'
import 'react-tippy/dist/tippy.css'
import './style.css'
import { Tooltip } from 'react-tippy'
import { EmptyMessage, SuccessMessage } from '../'
import Modal from 'react-responsive-modal'

const modalStyle = {
  closeButton: {
    cursor: 'pointer'
  },
  overlay: {
    backgroundColor: 'rgba(35, 35, 35, 0.5)'
  },
  modal: {
    width: '500px',
    height: '380px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px 0 rgba(100, 100, 100, 0.25)'
  }
}

export default class SidePanel extends React.Component<SidePanelProps, SidePanelState> {

  constructor (props: SidePanelProps) {
    super(props)
    this.state = {
      currentTab: 'backlog',
      modal: false,
      textarea: '',
      success: false
    }
    this.setTab = this.setTab.bind(this)
    this.onOpenModal = this.onOpenModal.bind(this)
    this.addMembers = this.addMembers.bind(this)
    this.addStories = this.addStories.bind(this)
    this.renderInvite = this.renderInvite.bind(this)
    this.renderCreate = this.renderCreate.bind(this)
  }

  componentDidMount () {
    window.ipcRenderer.on('update-session-reply', (event: any, { response }: any) => {
      this.setState({ success: true, modal: false, textarea: '' })
      setTimeout(() => {
        this.setState({ success: false })
      }, 500)
    })
  }

  setTab (tab: string) {
    this.setState({ currentTab: tab })
  }

  onOpenModal = () => {
    this.setState({ modal: true })
  }

  onCloseModal = () => {
    this.setState({ modal: false })
  }

  addMembers () {
    const { textarea } = this.state
    const { session } = this.props
    const list = textarea.toLowerCase().replace(/\n/g,',').replace(/\s/g,',').split(',')
    if (list.length > 0) {
      window.ipcRenderer.send('add-members', {
        session,
        list
      })
    }
  }

  addStories () {
    const { textarea } = this.state
    const { session } = this.props
    const stories = (textarea.match(/[^\r\n]+/g)) || []
    if (stories.length > 0) {
      window.ipcRenderer.send('add-stories', {
        session,
        stories
      })
    }
  }

  renderBacklog ({ email }: any, { backlog }: any) {
    if (!backlog || backlog.length === 0) {
      return <EmptyMessage icon={'list'} message={'session.emptyBacklog'} hint={'session.hintBacklog'}/>
    }
    const items = backlog.map((story: any) =>
        <li className={'story'} key={story}>
        <span>
          <div className={'story-icon'}>
            <Icon type ={'file-text'} size={'20'} color={'#3b3e69'}/>
          </div> {story}</span>
          <div className={'story-trash'}>
            <a><Icon type ={'trash-2'} size={'20'} color={'#3b3e69'}/></a>
           </div>
        </li>
    )
    return (<ul className={'story-list'}>{items}</ul>)
  }

  renderTeam ({ email }: any, { team, host }: any) {
    if (!team || (team.length === 1 && team[0] === host)) {
      return <EmptyMessage icon={'users'} message={'session.emptyTeam'} hint={'session.hintTeam'}/>
    }

    const items = team.map((member: any) =>
        <li className={'member'} key={member}>
          <div className={'member-icon'}>
            <Icon type ={member === email ? 'user-check' : 'user'} size={'20'} color={'#3b3e69'}/>
          </div> {member}
          {
              member !== host && member !== email ?
              <div className={'member-trash'}>
                <a><Icon type ={'trash-2'} size={'20'} color={'#3b3e69'}/></a>
              </div> : undefined
          }
        </li>
    )
    return (<ul className={'member-list'}>{items}</ul>)
  }

  renderInvite (session: any) {
    return (
      <div>
        <h2 className={'modal-title'}>{i18n.t('session.invite.title')}</h2>
        <div className={'modal-line'}/>
        <p className={'modal-paragraph'}>{i18n.t('session.invite.paragraph')}</p>
        <textarea rows={7} className={'modal-textarea'}
          onChange={(event) => { this.setState({ textarea: event.target.value }) }} ></textarea>
        <p className={'modal-hint'}>{i18n.t('session.invite.hint')}</p>
        <div className={'modal-button-container'}>
          <a onClick={this.addMembers} className={'modal-button'}>{i18n.t('session.invite.button')}</a>
        </div>
      </div>
    )
  }

  renderCreate (session: any) {
    return (
      <div>
        <h2 className={'modal-title'}>{i18n.t('session.story.title')}</h2>
        <div className={'modal-line'}/>
        <p className={'modal-paragraph'}>{i18n.t('session.story.paragraph')}</p>
        <textarea rows={10} className={'modal-textarea'}
          onChange={(event) => { this.setState({ textarea: event.target.value }) }} ></textarea>
          <p className={'modal-hint'}></p>
        <div className={'modal-button-container'}>
          <a onClick={this.addStories} className={'modal-button'}>{i18n.t('session.story.button')}</a>
        </div>
      </div>
    )
  }

  render () {
    const { user, session } = this.props
    const { currentTab, modal, success } = this.state
    return (
      <div className={'card'}>
        <div className={'card-title'}>
          <ul className={'card-tabs'}>
            <li><a className={currentTab === 'backlog' ? 'active' : undefined}
                        onClick={() => { this.setTab('backlog') } }>{i18n.t('session.backlog')}
                              {session.backlog.length > 0 ? ` (${session.backlog.length})` : undefined}</a></li>
            <li><a className={currentTab === 'team' ? 'active' : undefined}
                        onClick={() => { this.setTab('team') } }>{i18n.t('session.team')}</a></li>
            <li className={'right-item'}>
              <Tooltip title={i18n.t(currentTab === 'backlog' ? 'session.addStory' : 'session.addMember')}
                position={'bottom'}>
                <a onClick={this.onOpenModal}><Icon type ={'plus'} size={'20'} color={'#ffffff'}/></a>
              </Tooltip>
            </li>
          </ul>
        </div>
        <div className={'card-content'}>
          { currentTab === 'backlog' ? this.renderBacklog(user, session) : undefined }
          { currentTab === 'team' ? this.renderTeam(user, session) : undefined }
        </div>
        <Modal open={modal} onClose={this.onCloseModal} center={true} closeIconSize={20}
            styles={ modalStyle }>
          { currentTab === 'backlog' ? this.renderCreate(session) : undefined }
          { currentTab === 'team' ? this.renderInvite(session) : undefined }
        </Modal>
        <SuccessMessage message={currentTab === 'backlog' ? 'session.story.success' : 'session.invite.success'}
          show={success}/>
      </div>
    )
  }
}
