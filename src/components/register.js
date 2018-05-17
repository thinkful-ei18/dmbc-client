import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import RegistrationForm from './registration-form';
import Logo from './logo';
import '../styles/register.css';

export function Registration(props) {
	// If we are logged in (which happens automatically when registration
	// is successful) redirect to the user's dashboard
	if (props.loggedIn && !props.currentUser.ambassador) {
		return <Redirect to="/dashboard" />;
	} else if (props.loggedIn && props.currentUser.ambassador) {
		return <Redirect to="/ambassador-page" />;
	}
	return (
		<div className="registration">
			<div className="splash-logo">
				<Logo />
			</div>
			<div className="hero-container">
				<h2>Adventure Awaits</h2>
				<p>
					Register now and let us help you make your next trip truly
					memorable
				</p>
			</div>
			<div className="form-container">
				<h2>Traveler Register</h2>
				<RegistrationForm ambassador="false" />
				<span className="account-link">
					Already have an account? <Link to="/">Login</Link>
				</span>
			</div>
		</div>
	);
}

const mapStateToProps = state => ({
	currentUser: state.auth.currentUser,
	loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Registration);
