import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import RegistrationForm from './registration-form';
import '../styles/register.css'
export function Registration(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="registration">
      <div className="hero-container">
        <h2>Adventure Awaits</h2>
        <p>In summis constias reprehenderit, irure id admodum do dolore qui singulis qui
        illum!</p>
      </div>
      <div className="form-container">
        <h2>Register</h2>
        <p>Already have an account? <Link to="/login">Login</Link></p>
        <RegistrationForm ambassador="false"/>

      </div>

    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Registration);
