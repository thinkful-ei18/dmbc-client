import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Logout from './logout';

export class Navigation extends React.Component {
  render() {
    let ambassadorLink = '';
    let isLoggedIn = (
      <div className="nav-content">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/ambassador-register">Ambassador Register</Link>
        <Link to='/mock'>Mockups</Link>
      </div>
    )

    if (this.props.currentUser && this.props.currentUser.ambassador) {
      ambassadorLink = <Link to="/ambassador-page">Ambassador Dashboard</Link>
    }
    if (this.props.loggedIn) {
      isLoggedIn = (
        <div className="nav-content">
          <Link to="/dashboard">My Dashboard</Link>
          {ambassadorLink}
          <Logout />
      </div>
      );
    }

    return (
      <div className="navigation">
        {isLoggedIn}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return {
    loggedIn: currentUser !== null,
    currentUser: currentUser
  }
};

export default connect(mapStateToProps)(Navigation);