import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showSignInWindow } from './user.actions';
import { setActiveUser, logOutAction } from '../shared/activeUser.actions'
import UserNavbar from './userNavbar.component';
import Cookies from 'js-cookie';

class UserNavbarContainer extends Component {
  // doesn't work after refresh. why?
  componentDidMount() {
    const user = Cookies.get('user')
    // this.props.setActiveUser(JSON.parse(user)); error: Unexpected token a in JSON at position 0
    if (user) {
      console.log('user', user)
      this.props.setActiveUser(user);
      console.log('active user', this.props.activeUser)
    }
  }

  render() {
    const { setActiveUser, activeUser, showSignInWindow, logOutAction } = this.props;
    return (
      <UserNavbar setActiveUser={setActiveUser} activeUser={activeUser} showSignInWindow={showSignInWindow} logOutAction={logOutAction} />
    )
  }
}

export default connect(
  (state) => ({activeUser: state.activeUser}),
  (dispatch) => bindActionCreators({setActiveUser, showSignInWindow, logOutAction}, dispatch)
)(UserNavbarContainer);