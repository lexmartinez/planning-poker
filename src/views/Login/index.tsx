import { connect } from 'react-redux'
import Login from './view'
import { authenticate } from '../../actions/login'

const mapStateToProps = (state: any) => {
    return ({
        ...state.loginReducer
      })
}

const mapDispatchToProps = (dispatch: any) => ({
  authenticate: (user: string, password: string) => {
    dispatch(authenticate(user, password))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)