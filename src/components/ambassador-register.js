import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import RegistrationForm from './registration-form';
import Logo from './logo';
import '../styles/register.css'
export function AmbassadorRegister(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="registration">
      <div className="hero-container">
        <div className='splash-logo'><Logo/></div>
        <h2>Want to be an Ambassador?</h2>
        <p>If you're a master of all the nooks and crannies, hole in the walls, and hidden gems of your city, you're ready to be an ambassador for pley.</p>
      </div>
      <div className="form-container">
        <h2>Ambassador Registration</h2>
        <RegistrationForm ambassador="true"/>
        <span className='account-link'>Already have an account? <Link to="/">Login</Link></span>

      </div>


    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(AmbassadorRegister);
