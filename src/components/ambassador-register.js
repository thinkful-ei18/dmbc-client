import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import RegistrationForm from './registration-form';
import Logo from './logo';
import '../styles/register.css'
export function AmbassadorRegister(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the user's dashboard
  if (props.loggedIn && !props.currentUser.ambassador) {
    return <Redirect to="/dashboard" />;
  } else if (props.loggedIn && props.currentUser.ambassador) {
    return <Redirect to="/ambassador-page" />;
  }
  return (
    <div className="registration">
      <div className="hero-container">
        <div className='splash-logo'><Logo/></div>
        <h2>Want to be an Ambassador?</h2>
        <p>If you want to show the best of what your city has to offer, join pley</p>
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
  currentUser: state.auth.currentUser,
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(AmbassadorRegister);
