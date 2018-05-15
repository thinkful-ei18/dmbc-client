import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Logout from './logout';
import Logo from './logo';
import '../styles/navigation.css';
export class Navigation extends React.Component {
  render() {
    if (!this.props.loggedIn) {
      return <Redirect to='/'/>
    }
    let ambassadorLink = '';
    if (this.props.currentUser && this.props.currentUser.ambassador) {
      ambassadorLink = <Link to="/ambassador-page">Ambassador Dashboard</Link>
    }
    
    let isLoggedIn = (
      <div className="nav-content">
        <Link to="/dashboard">My Dashboard</Link>
        {ambassadorLink}
        <Logout />
    </div>
    );

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
