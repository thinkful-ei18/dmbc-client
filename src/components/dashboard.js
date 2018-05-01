import React from 'react';
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

export default requiresLogin()(Dashboard);