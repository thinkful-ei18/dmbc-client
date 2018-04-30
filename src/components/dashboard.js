import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requires-login';
import './index.css';

export class Dashboard extends React.Component {
  render () {
    return (
      <div className="dashboard">
        Hello from the Dashboard!
      </div>
    )
  }
}

export default requiresLogin()(Dashboard);