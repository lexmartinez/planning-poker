import * as React from 'react'
export default class Login extends React.Component<LoginProps, LoginState> {

  constructor (props: LoginProps) {
    super(props)
    this.state = {
      user: undefined,
      error: undefined,
      isAuthenticated: false
    }
  }

  componentWillReceiveProps (nextProps: any) {
    if (nextProps.isAuthenticated && nextProps.user) {
      this.setState({
        user: nextProps.user,
        isAuthenticated: nextProps.isAuthenticated,
        error: nextProps.error
      })
    }
  }

  componentDidUpdate () {
    if (this.state.isAuthenticated) {
      this.props.history.push('/')
    }
  }
  render () {
    return (
        <div className={'wrapper'}>
            <img src={require('../../assets/images/cards.svg')} width={'90'} />
            <h1 className={'logo-title'}>Planning Poker</h1>
            <h2 className={'logo-subtitle'}>Let's Estimate</h2>
            <div className={'login-buttons'}>
                {
                    // <a href={'#'} className={'button'}>
                    // <img className={'button-logo'} src={require('../../assets/images/google-logo.svg')}
                    // width={'24'}/> Login with Google</a>
                    // <br/><br/>
                }
                <a href={'#'} className={'button'} onClick={this.props.login}>
                        <img className={'button-logo'} src={require('../../assets/images/github-logo.svg')}
                            width={'24'} /> Login with GitHub</a>
            </div>
        </div>
    )
  }
}
