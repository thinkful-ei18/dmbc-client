import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import RegistrationForm from './registration-form';
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
        <h2>Want to be an Ambassador?</h2>
        <p>Iudicem minim an possumus imitarentur nam magna praetermissum litteris fugiat
          mandaremus rerol.</p>
      </div>
      <div className="form-container">
        <h2>Ambassador Register Copy</h2>
        <span className='account-link'>Already have an account? <Link to="/login">Login</Link></span>
        <RegistrationForm ambassador="true"/>
      </div>

    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(AmbassadorRegister);
