import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import RegistrationForm from './registration-form';
import Logo from './logo'
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

        <Logo size={'large'} />
        <br></br>
        <Logo/>
        <br></br>
        <Logo size={'small'} />

        <h2>Adventure Awaits</h2>
        <p>In summis constias reprehenderi, id admodum do dolore qui singulis qui
        illum!</p>
      </div>
      <div className="form-container">
        <h2>Join Pley</h2>
        <span className='account-link'>Already have an account? <Link to="/login">Login</Link></span>
        <RegistrationForm ambassador="false"/>

      </div>

    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Registration);
