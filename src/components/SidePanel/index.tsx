import * as React from 'react'
import i18n from '../../config/i18n'
import Icon from '@oovui/react-feather-icons'
import 'react-tippy/dist/tippy.css'
import './style.css'
import { Tooltip } from 'react-tippy'

export default class SidePanel extends React.Component<SidePanelProps, SidePanelState> {

  constructor (props: SidePanelProps) {
    super(props)
    this.state = {
      currentTab: 'backlog'
    }
    this.setTab = this.setTab.bind(this)
  }

  setTab (tab: string) {
    this.setState({ currentTab: tab })
  }

  renderTeam ({ email }: any, { team, host }: any) {
    if (!team || team.length === 0) return <div>paila :(</div>

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

  render () {
    const { user, session } = this.props
    const tab = this.state.currentTab
    return (
            <div className={'card'}>
                <div className={'card-title'}>
                     <ul className={'card-tabs'}>
                       <li><a className={tab === 'backog' ? 'active' : undefined}
                              onClick={() => { this.setTab('backlog') } }>{i18n.t('session.backlog')} (5)</a></li>
                       <li><a className={tab === 'team' ? 'active' : undefined}
                              onClick={() => { this.setTab('team') } }>{i18n.t('session.team')}</a></li>
                       <li className={'right-item'}>
                        <Tooltip title={i18n.t('session.invite')} position={'bottom'}>
                          <a><Icon type ={'user-plus'} size={'20'} color={'#ffffff'}/></a>
                        </Tooltip>
                       </li>
                     </ul>
                </div>
                <div className={'card-content'}>
                {
                   this.state.currentTab === 'backlog' ?
                        <div>BACKLOG</div> :
                        undefined
                }
                { this.state.currentTab === 'team' ? this.renderTeam(user, session) : undefined }
                </div>
            </div>
    )
  }
}
