import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from './login-form';

export class Login extends React.Component {
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="login">
        <h2>Login</h2>
        <LoginForm />
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Login);