import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Logout from "./logout";
import "../styles/navigation.css";
export class Navigation extends React.Component {
  render() {
    if (!this.props.loggedIn && !localStorage.getItem("authToken")) {
      return <Redirect to="/" />;
    }
    let ambassadorLink = <Link to="/dashboard">My Dashboard</Link>;
    if (this.props.currentUser && this.props.currentUser.ambassador) {
      ambassadorLink = <Link to="/ambassador-page">Ambassador Dashboard</Link>;
    }

    let isLoggedIn = (
      <div className="nav-content">
        {ambassadorLink}
        <Logout />
      </div>
    );

    return <div className="navigation">{isLoggedIn}</div>;
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    loggedIn: currentUser !== null,
    currentUser: currentUser
  };
};

export default connect(mapStateToProps)(Navigation);
