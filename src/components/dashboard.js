import React from 'react';
import {connect} from 'react-redux';

import requiresLogin from '../requires-login';
import Logout from './logout';

export class Dashboard extends React.Component {
  render () {
    return (
      <div className="dashboard">
        Hello from the Dashboard!
        <Logout />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));