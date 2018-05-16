import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from './login-form';
import '../styles/login.css';

export class Login extends Component {
  render() {
    if (this.props.loggedIn && !this.props.currentUser.ambassador) {
      return <Redirect to="/dashboard" />;
    } else if (this.props.loggedIn && this.props.currentUser.ambassador) {
      return <Redirect to="/ambassador-page"/>
    } else if (!this.props.loggedIn && this.props.loading) {
      return <p>Loading...</p>
    }

    return (
      <div className="login-container">
        <h2>Login</h2>
        <LoginForm />
        <p>Don't have an account? <Link to="/register">Register</Link></p>
        <p>Want to be an ambassador? <Link to="/ambassador-register">Register</Link></p>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  currentUser: state.auth.currentUser,
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Login);
